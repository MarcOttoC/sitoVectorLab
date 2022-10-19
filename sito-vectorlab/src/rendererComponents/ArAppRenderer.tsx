import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshNormalMaterial,
  SphereGeometry,
  AxesHelper,
} from "three";

class ArAppRenderer extends React.Component{

  helper = new AxesHelper (5000)
  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  sphere!: Mesh;
  light!: DirectionalLight;
  material!: MeshNormalMaterial;
  geometry!: SphereGeometry;
  rect!: DOMRect;

  SMX!: number;
  A!: number;
  radius = 30;

  componentDidMount(): void {

    const FOV = 50;
    this.rect = this.myCanvas.getBoundingClientRect();
    const degreePerPixel = FOV / this.rect.width;
    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, alpha:true, antialias:true});
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(FOV);
    this.camera.position.set(0, 0, this.radius);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    this.scene.add(this.light,this.helper);
    this.update();
    this.material = new MeshNormalMaterial;
    this.geometry = new SphereGeometry(1, 30, 30);
    this.sphere = new Mesh(this.geometry, this.material);
    this.scene.add(this.sphere,this.helper);
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);  

    this.myCanvas.addEventListener("mousemove", e => { 

      this.SMX = (e.clientX - this.rect.left) - (this.rect.width/2);
      this.A=degreePerPixel * this.SMX;
      this.sphere.position.x = Math.tan(this.A* Math.PI / 180)*this.radius;
  
      this.SMX = (e.clientY - this.rect.top) - (this.rect.height/2);
      this.A=degreePerPixel * this.SMX;
      this.sphere.position.y = -Math.tan(this.A* Math.PI / 180)*this.radius;
    })
  }

  componentWillUnmount(): void {

    this.scene.clear();
    this.material.dispose();
    this.geometry.dispose();
    this.renderer.dispose();
  }

  private update(): void {

    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  render(){

    return (

      <div className='canvas-container'>
        <canvas className="canvas" height={1920} width={1080} ref={(canvasRef) => { this.myCanvas = canvasRef! }}></canvas>
      </div>
    );
  }
}
export default ArAppRenderer;