<?php
	class HelperMySql{
		private $M;//Object MySQLi Connection
		private $R = false;//Object Result
		private $data = Array(); //Datos de conexion
		private $Error = false;
		
		public function __construct($host,$user,$pass,$db){
			$this->data = Array($host,$user,$pass,$db);
			$this->M = new mysqli($host, $user, $pass, $db);
		}
	   	public function __destruct() {
      			$this->close();
  		 }
			
		public function query($sql){
			$this->R = false;
			if($this->M->errno){
				$this->__construct($this->data[0],$this->data[1],$this->data[2],$this->data[3]);
			}
			
			$this->R = $this->M->query($sql);

			if($this->M->errno){
				$this->R = false;
				return false;
			}else{
				return $this->R;
			}
		}

		public function close(){
			if($this->M->errno == 0){
				$this->M->close();
			}
			return true;
		}
	}
?>