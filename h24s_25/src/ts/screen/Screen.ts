import Matter, {Bodies, Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner} from "matter-js";
import {ScreenMode} from "@/ts/screen/ScreenMode";
import ScreenData from "@/ts/data/ScreenData";
import {BallTypeEnum} from "@/ts/balltypes";
import BallData from "@/ts/data/BallData";
import {
    type BallInterface,
    FunctionBallInterface,
    HigherOrderFunctionBallInterface,
    NumberBallInterface,
    OutputBallInterface
} from "@/ts/ballInterface";

/**
 * スクリーン
 */
export default class Screen {
    /**
     * 重力が働くかどうか
     */
    hasGravity: boolean;
    engine: Engine;
    render: Render;
    runner: Runner;
    data: ScreenData = new ScreenData();
    screenMode: ScreenMode = ScreenMode.EDIT;
    /**
     * 運動中のオブジェクトのマップ
     * key: id
     * value: {@link BallInterface}
     */
    objects: Map<string,BallInterface> = new Map();
    constructor(hasGravity: boolean) {
        this.hasGravity = hasGravity;
        // create an engine
        this.engine = Engine.create();

        // create a renderer
        this.render = Render.create({
            element: document.getElementById('screen') as HTMLElement,
            engine: this.engine
        });

        // create runner
        this.runner = Runner.create();

        //a
        this.data.balls.set("a",new BallData(
            BallTypeEnum.FUNCTION,
            {x: 200, y: 200},
            {x: 2, y: 0},
            new Map()
        ));
        this.data.balls.set("b",new BallData(
            BallTypeEnum.NUMBER,
            {x: 300, y: 200},
            {x: 0, y: 0},
            new Map()
        ));
        this.data.balls.set("c",new BallData(
            BallTypeEnum.NUMBER,
            {x: 400, y: 200},
            {x: 0, y: 0},
            new Map()
        ));
    }

    /**
     * 初期化
     */
    init() {
        this.edit();
        // run the renderer
        Render.run(this.render);


        // run the engine
        Matter.Runner.run(this.runner, this.engine);

        // マウスドラッグ
        const mouse = Mouse.create(this.render.canvas);
        this.render.mouse = mouse;
        const mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 1.0,
                render: {visible: false}
            }
        });
        Matter.Composite.add(this.engine.world, mouseConstraint);

        // event handlers
        Events.on(this.render, "afterRender", (event) => {
                const context = event.source.context;
                context.textBaseline = 'middle'
                context.textAlign = 'center'
                context.fillStyle = 'white'
                context.font = '48px serif'
                const bodies = Matter.Composite.allBodies(this.engine.world)
                for (const body of bodies) {
                    if (body.label === undefined) continue;
                    const id = body.label
                    const ball = this.objects.get(id)
                    if(ball === undefined) continue;
                    context.fillText(ball.label(), body.position.x, body.position.y)
                }
                context.lineWidth = 1.5
                context.strokeStyle = '#ffffff'
                context.stroke()
            }
        )
        Events.on(mouseConstraint, "mousemove", (event) =>{
            if(event.source.body === null) return;
            if(this.screenMode === ScreenMode.EDIT) {
                const mousePosition = event.mouse.position;
                const ballData = this.data.balls.get(event.source.body.label)
                if(ballData === undefined) return;
                ballData.initialPosition.x = mousePosition.x
                ballData.initialPosition.y = mousePosition.y
            }
            //画面初期化
            this.edit()
        })
        Events.on(this.engine, "collisionStart", (event) => {
            for(const pair of event.pairs) {
                if(pair.bodyA.label === undefined || pair.bodyB.label === undefined) continue;
                this.collide(pair.bodyA.label, pair.bodyB.label)
            }
        })
    }

    /**
     * 編集画面に切り替える
     */
    edit() {
        //重力
        this.engine.gravity.y = 0;

        //objectsの初期化
        this.objects = new Map();

        //オブジェクト配置
        Composite.remove(this.engine.world, this.engine.world.bodies);
        const ground = Matter.Bodies.rectangle(400, 610, 810, 10, {isStatic: true});
        Composite.add(this.engine.world, ground);
        for(const entry of this.data.balls.entries()) {
            const id = entry[0];
            const ballData = entry[1];
            const body = Bodies.circle(ballData.initialPosition.x, ballData.initialPosition.y, 30, {});
            body.label = id;
            Composite.add(this.engine.world, body);
        }

        this.screenMode = ScreenMode.EDIT;
    }

    /**
     * 再生画面
     */
    play() {
        //重力
        if(this.hasGravity) this.engine.gravity.y = 1;

        //dataからオブジェクト生成
        Composite.remove(this.engine.world, this.engine.world.bodies);
        const ground = Matter.Bodies.rectangle(400, 610, 810, 10, {isStatic: true});
        Composite.add(this.engine.world, ground);
        for(const entry of this.data.balls.entries()) {
            const id = entry[0];
            const ballData = entry[1];
            const ball = ballData.createBall()
            this.objects.set(id,ball);

            const body = Bodies.circle(ballData.initialPosition.x, ballData.initialPosition.y, 30, {
                positionPrev: {x: ballData.initialPosition.x-ballData.initialVelocity.x, y: ballData.initialPosition.y-ballData.initialVelocity.y},
            });
            body.label = id;
            Composite.add(this.engine.world, body);
        }

        this.screenMode = ScreenMode.PLAY;
    }

     setBall(id: string, ball: BallInterface|null) {
        if(ball === null) {
            this.objects.delete(id);
            Composite.remove(this.engine.world, this.engine.world.bodies.filter(body => body.label === id));
        } else {
            this.objects.set(id, ball);
        }
    }

    collide(idA: string, idB: string) {
        const ballA = this.objects.get(idA);
        const ballB = this.objects.get(idB);
        if(ballA === undefined || ballB === undefined) return;
        if(ballA instanceof NumberBallInterface) {
            if(ballB instanceof FunctionBallInterface) {
                const pair = ballB.func(ballA)
                this.setBall(idA, pair.other);
                this.setBall(idB, pair.self);
            } else if(ballB instanceof OutputBallInterface) {
                //TODO output
            }
        } else if(ballA instanceof FunctionBallInterface) {
            if(ballB instanceof NumberBallInterface) {
                const pair = ballA.func(ballB)
                this.setBall(idA, pair.self);
                this.setBall(idB, pair.other);
            } else if(ballB instanceof HigherOrderFunctionBallInterface) {
                const pair = ballB.func(ballA)
                this.setBall(idA, pair.other);
                this.setBall(idB, pair.self);
            }
        } else if(ballA instanceof HigherOrderFunctionBallInterface) {
            if(ballB instanceof FunctionBallInterface) {
                const pair = ballA.func(ballB)
                this.setBall(idA, pair.self);
                this.setBall(idB, pair.other);
            }
        } else if(ballA instanceof OutputBallInterface) {
            if(ballB instanceof NumberBallInterface) {
                //TODO output
            }
        }
    }
}