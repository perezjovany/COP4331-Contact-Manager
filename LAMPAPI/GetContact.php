<?php
$inData = getRequestInfo();

$userId = $inData["userId"];
$contactId = $inData["contactId"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ? AND ID = ?");
    $stmt->bind_param("ss", $userId, $contactId);
    $stmt->execute();

    $searchResults = "";
    $searchCount = 0;

    $result = $stmt->get_result();

    if($row = $result->fetch_assoc())
    {
        returnWithInfo( $row['ID'], $row['Name'], $row['Phone'], $row['Email'] );
    }
    else
    {
        returnWithError("Invalid Contact Id");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithInfo( $contactId, $name, $phone, $email )
{
    $retValue = '{"id":' . $contactId . ',"Name":"' . $name . '","Phone":"' . $phone . '","Email":"' . $email . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>