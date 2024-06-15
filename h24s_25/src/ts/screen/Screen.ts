import Matter, {Bodies, Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner} from "matter-js";
import {ScreenMode} from "@/ts/screen/ScreenMode";
import ScreenData from "@/ts/screen/GameData";
import {BallTypeEnum} from "@/ts/balltypes";
import BallData from "@/ts/screen/BallData";
import type {BallInterface} from "@/ts/ballInterface";

export default class Screen {
    hasGravity: boolean;
    engine: Engine;
    render: Render;
    runner: Runner;
    data: ScreenData = new ScreenData();
    screenMode: ScreenMode = ScreenMode.EDIT;
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
            BallTypeEnum.NUMBER,
            {x: 400, y: 200},
            {x: 1, y: 0},
            {}
        ));
    }
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
                context.font = '60 px Arial'
                const bodies = Matter.Composite.allBodies(this.engine.world)
                for (const body of bodies) {
                    context.fillText(body.label, body.position.x, body.position.y)
                }
                context.lineWidth = 1.5
                context.strokeStyle = '#ffffff'
                context.stroke()
            }
        )
        Events.on(mouseConstraint, "mousemove", (event) =>{
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
    }

    edit() {
        //重力
        this.engine.gravity.y = 0;

        //オブジェクト配置
        Composite.remove(this.engine.world, this.engine.world.bodies);
        const ground = Matter.Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
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

    play() {
        //重力
        if(this.hasGravity) this.engine.gravity.y = 1;

        //dataからオブジェクト生成
        Composite.remove(this.engine.world, this.engine.world.bodies);
        const ground = Matter.Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
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
}