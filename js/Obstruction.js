class Obstruction {
  constructor(x, y) {
    this.object = this.createOBT();
    this.object.position.set(x, 4, y);
    this.position = new THREE.Vector2(x, y);
    
    // 콜라이더
    this.collider = {
    	      id: this.object.id,
    	      type: "cylinder",		// 충돌 발생 시 타입을 감지하기 위해 원기둥으로 지정
    	      source: "obstruction",	// Cylinder타입 중 obstruction임을 표시
    	      radius: 2.5,
    	      radius2: 2.5 * 2.5,
    	      height: 25,
    	      position: this.position,
    }
  }
  
  // 방해물 (기둥)의 모델을 만드는 함수
  createOBT() {
	const texture = new THREE.TextureLoader().load("imgs/obstruction.png");
	const texture_bump = new THREE.TextureLoader().load("imgs/obstruction_bump.png");
    
	const ObstructionGeometry = new THREE.BoxGeometry(8, 8, 8)
    const wallMaterial = new THREE.MeshStandardMaterial({
    	map: texture, 
    	bumpMap: texture_bump
    	});
    
    const Obstruction = new THREE.Mesh(ObstructionGeometry, wallMaterial);
    Obstruction.scale.set(1, 1, 1);
    Obstruction.position.set(5, 1, 10);
    
    return Obstruction;
  }
}

function spawnObstruction(){
	Obstruction1 = new Obstruction(5, 10);
	collider_obstruction.push(Obstruction1);
	
	Obstruction2 = new Obstruction(15, 10);
	collider_obstruction.push(Obstruction2);
	
	Obstruction3 = new Obstruction(25, 10);
	collider_obstruction.push(Obstruction3);
	
	Obstruction4 = new Obstruction(5, 20);
	collider_obstruction.push(Obstruction4);
	
	Obstruction5 = new Obstruction(5, 30);
	collider_obstruction.push(Obstruction5);
	
	scene.add(Obstruction1.object);
	scene.add(Obstruction2.object);
	scene.add(Obstruction3.object);
	scene.add(Obstruction4.object);
	scene.add(Obstruction5.object);
}
