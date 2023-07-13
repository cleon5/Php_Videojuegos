<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-type: application/json; charset=UTF-8');
$Serverpath = $_SERVER['DOCUMENT_ROOT'];
require_once($Serverpath . "/back/inc/Config.php");

$headers = apache_request_headers();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $nombre = isset($data->nombre) ? $data->nombre : '';
        $plataforma = isset($data->plataforma) ? $data->plataforma : '';
        $estado = isset($data->estado) ? $data->estado : '';
        $genero = isset($data->genero) ? $data->genero : '';
        $img = isset($data->img) ? $data->img : '';

        try {
            $sqlString = "INSERT INTO videojuego (nombre, plataforma, estado, genero, img) VALUES ('" . $nombre . "', '" . $plataforma . "', '" . $estado . "', '" . $genero . "', '" . $img .  "');";

            $result = $sqli->query($sqlString);

            if (!$result) {
                http_response_code(500);
                die($ddd);
            }

            http_response_code(201);
            echo json_encode(array(
                "error" => false,
                "statusCode" => 201,
                "message" => "Registro insertado"
            ));
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array(
                "error" => true,
                "statusCode" => 401,
                "message" => $e->getMessage()
            ));
        }
        break;
    case 'PUT':
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $id = isset($data->id) ? $data->id : '';
        $nombre = isset($data->nombre) ? $data->nombre : '';
        $plataforma = isset($data->plataforma) ? $data->plataforma : '';
        $estado = isset($data->estado) ? $data->estado : '';
        $genero = isset($data->genero) ? $data->genero : '';
        $img = isset($data->img) ? $data->img : '';

        try {
            $sqlString = "UPDATE videojuego SET videojuego.nombre = '$nombre', videojuego.plataforma = '$plataforma', videojuego.estado= '$estado', videojuego.img = '$img', videojuego.genero = '$genero'  WHERE videojuego.id = " . $id;
            $result = $sqli->query($sqlString);

            if (!$result) {
                http_response_code(500);
                die($ddd);
            }

            http_response_code(201);
            echo json_encode(array(
                "error" => false,
                "statusCode" => 201,
                "message" => "Registro insertado"
            ));
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array(
                "error" => true,
                "statusCode" => 401,
                "message" => $e->getMessage()
            ));
        }
        break;

    case 'DELETE':
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $id = isset($data->id) ? $data->id : 0;

        try {
            if ($id > 0) { //DELETE FROM `videojuegos_lista`.`videojuego` WHERE (`id` = '15');
                $sqlString = "DELETE FROM videojuego WHERE (id=" . $id . ")";
                $result  = $sqli->query($sqlString);

                http_response_code(200);
                echo json_encode(array(
                    "error" => false,
                    "statusCode" => 200,
                    "message" => "Registro borrado"
                ));
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "error" => true,
                    "statusCode" => 400,
                    "message" => "Faltan datos"
                ));
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array(
                "error" => true,
                "statusCode" => 401,
                "message" => $e->getMessage()
            ));
        }
        break;

    case 'GET':
        $id_curso = isset($_GET["idc"]) ? $_GET["idc"] : 0;

        try {
            $lista = array();
            // $conn = mysqli_connect('localhost:3306', 'root', 'root') or die("Error connecting");
            //mysqli_select_db($conn, 'videojuegos_lista');
            //mysqli_query($conn, "SET lc_time_names = 'es_ES'");

            $sqlString = "SELECT id,nombre,img,genero,estado FROM videojuego ";
            $result = $sqli->query($sqlString);

            if (!$result) {
                $mensaje  = 'Consulta no válida: ' . mysqli_error($conn) . "<br />";
                $mensaje .= 'Consulta completa: ' . $sqlString;
                die($mensaje);
            }

            $num = mysqli_num_rows($result);
            if ($num > 0) {
                while ($rs_actividad = $result->fetch_array()) {

                    $temp = array(
                        'id' => htmlentities($rs_actividad['id'], ENT_QUOTES),
                        'nombre' => htmlentities($rs_actividad['nombre'], ENT_QUOTES),
                        'img' => htmlentities($rs_actividad['img'], ENT_QUOTES),
                        'genero' => htmlentities($rs_actividad['genero'], ENT_QUOTES),
                        'estado' => htmlentities(date('d-m-Y', strtotime($rs_actividad['estado'])), ENT_QUOTES),
                    ); //Array temporal
                    array_push($lista, $temp); //se introduce el array temporal a la lista
                }
                http_response_code(200);
                echo json_encode(array(
                    "error" => false,
                    "statusCode" => 200,
                    "message" => "OK",
                    "data" => $lista
                ));
            } else {
                http_response_code(200);
                echo '{"respuesta":"No hay actividades en este curso"}';
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array(
                "Error" => $e->getMessage()
            ));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("Error" => "Metodo No permitido"));
        break;
}
