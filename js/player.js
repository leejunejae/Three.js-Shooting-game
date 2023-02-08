class Player{
		constructor(position) {
		this.position = new THREE.Vector2(position.x, position.z);

		controls = new THREE.PointerLockControls(camera);
		scene.add(controls.getObject());

		this.head = controls.getObject();
		this.head.position.set(position.x, position.y, position.z);
    this.controls = {
  	      dx: 0,
  	      dz: 0,
  	      movetime : 0,
  	    };

    this.health = 100;		// 플레이어의 체력
    this.score = 0;			// 플레이어의 점수
    this.bullet = 30;		// 플레이어의 남은 탄 수

    document.addEventListener('keydown', () => this.move(), false );
    document.addEventListener('keyup', () => this.stop(), false );
    document.addEventListener('mousedown', (mouseEvent) => this.onMouseDown(mouseEvent), false);
  }

	move() {
	    if(event.keyCode==87)
	    	this.controls.dz = -60*this.controls.movetime;
	    else if(event.keyCode==65)
	    	this.controls.dx = -60*this.controls.movetime;
	    else if(event.keyCode==83)
	    	this.controls.dz = 60*this.controls.movetime;
	    else if(event.keyCode==68)
	    	this.controls.dx = 60*this.controls.movetime;
	    else if(event.keyCode==82)
	        setTimeout(() => {
	            this.bullet = 30;
	          },1000);

	    if((this.health == 0 || this.winner) && keyCode == 32) {
	      location.reload();
	    }
	  }

	  stop() {
		    if(event.keyCode==87)
		    	this.controls.dz = 0;
		    else if(event.keyCode==65)
		    	this.controls.dx = 0;
		    else if(event.keyCode==83)
		    	this.controls.dz = 0;
		    else if(event.keyCode==68)
		    	this.controls.dx = 0;
	  }



	  // 마우스 이벤트에 대한 함수
	  onMouseDown(mouseEvent) {
	    if(loading) return;

	    const button = mouseEvent.button;
	    const roty = this.head.rotation.y;	// 플레이어의 회전 정도

	    const _roty = roty + Math.atan(1/-2); // 총의 각도
	    const dist = Math.sqrt(5); // 총까지의 거리

	    const _dx = this.controls.dx;	// 플레이어의 x좌표 값
	    const _dz = this.controls.dz;	// 플레이어의 z좌표 값
	    const _sin = Math.sin(roty);
	    const _cos = Math.cos(roty);

	    const vx = _dx * _cos + _dz * _sin; 	// 플레이어가 x좌표 상에서 움직일 값의 크기
	    const vy = _dz * _cos + _dx * -_sin;	// 플레이어가 z좌표 상에서 움직일 값의 크기


	    const muzzlePosition = {
	      x: this.position.x - dist * Math.sin(_roty) - 1 * _sin + vx * 0.05,
	      y: 2.2,
	      z: this.position.y - dist * Math.cos(_roty) - 1 * _cos + vy * 0.05,
	    }

	    // 총알 개수 감소
	    if(this.bullet > 0){
	        spawnLaser(new Laser(muzzlePosition, { x: 0, y: roty, z: 0 }));
	        this.bullet--;
	      }
	  }

	  animate(dtime) {
			this.controls.movetime = dtime;
			let movex = this.controls.dx
			let movez = this.controls.dz

		    if(this.controls.dx != 0 && this.controls.dz != 0) {
		    	movex /= sqrt2;
		    	movez /= sqrt2;
		    }

		    const _sin = Math.sin(this.head.rotation.y);
		    const _cos = Math.cos(this.head.rotation.y);

		    const posx = movex * _cos + movez * _sin;
		    const posz = movez * _cos + movex * -_sin;


		  //플레이어가 벽밖으로 나가지 못하게 함
			  if(CheckRoomX(posx) && CheckRoomY(posz)){
			  	if(CheckCollision(posx, posz)){
			  		this.position.x += posx;
			  		this.position.y += posz;
			  	}
			  }

		    this.head.position.x = this.position.x;
		    this.head.position.z = this.position.y;
		  }

  getPosition() { return this.position }
  getCollider() { return this.collider }

  equipKey() {
    this.key = new Key({x:-1, y: -0.7, z: -2});
    this.head.add(this.key.getModel());
    this.hasKey = true;
  }

  hurt(amt) {
    this.health -= 150 * amt;
    this.health = this.health < 0 ? 0 : this.health;
    healthOverlay.style.opacity = 1.0 - (this.health / 100.0);
    if(this.health == 0) {
      this.dead = true;
      healthOverlay.className = "darkness";
    }
  }

  heal() {
    this.health += Math.random() * 10 + 5;
    this.health = this.health > 100 ? 100 : this.health;
    healthOverlay.style.opacity = 1.0 - (this.health / 100.0);
  }

  isDead() { this.dead }

  scoreup() {
	    this.score = this.score + 1000;
  }
}
function CheckRoomX(vx){
	if(player.position.x + vx - 2.0 > -room_size2 && player.position.x + vx + 2.0 < room_size2)
		return true;
}

function CheckRoomY(vy){
	if(player.position.y + vy - 2.0 > -room_size2 && player.position.y + vy + 2.0 < room_size2)
		return true;
}

//플레이어 오브젝트와 기둥 간의 충돌 감지 처리
function CheckCollision(vx, vy) {
  for(let i = 0; i < collider_obstruction.length; i++){
	  if(collider_obstruction[i].position.x + 8 > player.position.x + vx + 2.0 && collider_obstruction[i].position.x - 8 < player.position.x + vx - 2.0){
		  if(collider_obstruction[i].position.y + 8 > player.position.y + vy + 2.0 && collider_obstruction[i].position.y - 8 < player.position.y + vy - 2.0)
		  return false;
	  }
  }

  return true;
}
