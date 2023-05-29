<?php
    $inData = getRequestInfo();
	
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        // Check if user already exists
        $stmt = $conn->prepare("SELECT * FROM Users WHERE Login = ?");
        $stmt->bind_param("s", $login);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User already exists, return an error
            returnWithError("User already exists", 409);
        } else {
            $stmt->close();

            $stmt = $conn->prepare("INSERT INTO Users (firstName, lastName, Login, Password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);

            if ($stmt->execute()) {
                $id = $stmt->insert_id;
                returnWithInfo($firstName, $lastName, $id);
            } else {
                returnWithError("Registration failed");
            }
        }

        $stmt->close();
        $conn->close();
    }
	
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
    
    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }
    
    function returnWithError($err, $responseCode = 400)
    {
        http_response_code($responseCode);
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($firstName, $lastName, $id)
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
