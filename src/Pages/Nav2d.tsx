import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

function AdvancedPixiScene() {
    const appRef = useRef<PIXI.Application | null>(null);
    const pixiContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const setupPixi = async () => {
            // Initialisation avec la nouvelle API `init()`
            if (appRef.current != null || !pixiContainer.current) return;

            const imageUrl = new URL("/images/bunny.png", import.meta.url).href;

            const app = new PIXI.Application();
            await app.init({
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0x282c34,
                resolution: window.devicePixelRatio || 1,
                autoDensity: true,
            });
            if (pixiContainer.current) {
                pixiContainer.current.appendChild(app.canvas); // `canvas` au lieu de `view`
                app.resizeTo = pixiContainer.current;
                appRef.current = app;
                console.log(imageUrl);
            }

            // Ajout d'un fond animé
            const particles: PIXI.Graphics[] = [];
            for (let i = 0; i < 50; i++) {
                const particle = new PIXI.Graphics();
                particle.fill({ color: 0xffffff, alpha: Math.random() * 0.5 });
                particle.circle(0, 0, Math.random() * 5 + 2);
                particle.fill();
                particle.x = Math.random() * app.screen.width;
                particle.y = Math.random() * app.screen.height;
                particle.alpha = Math.random();
                app.stage.addChild(particle);
                particles.push(particle);
            }

            // Création d'un sprite interactif
            PIXI.Assets.add({ alias: "bunny", src: imageUrl });
            const texture = await PIXI.Assets.load("bunny");
            const bunny = await PIXI.Sprite.from(texture);
            bunny.anchor.set(0.5);
            bunny.x = app.screen.width / 2;
            bunny.y = app.screen.height / 2;
            bunny.scale.set(2);
            app.stage.addChild(bunny);

            // Animation des particules
            app.ticker.add(() => {
                particles.forEach((p) => {
                    p.y += Math.random() * 2;
                    if (p.y > app.screen.height) p.y = 0;
                });
            });

            // Interaction : le bunny suit la souris
            app.stage.eventMode = "static";
            app.stage.on("pointermove", (event: PIXI.FederatedPointerEvent) => {
                bunny.x = event.global.x;
                bunny.y = event.global.y;
                console.log(event.global.x, event.global.y)
            });
            // Cleanup
            return () => {
                if (appRef.current) {
                    console.log("Destroying PixiJS...");
                    appRef.current.destroy(true);
                    appRef.current = null;
                }
            };
        };

        setupPixi();

    }, []);

    return <div> <h1>test</h1>
        <div ref={pixiContainer} style={{ width: "100%", height: "40vh" }} />
    </div>;
};

export default AdvancedPixiScene;
