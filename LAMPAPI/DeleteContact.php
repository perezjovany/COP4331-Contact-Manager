<?php
$inData = getRequestInfo();

$contactId = $inData["contactId"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    //$stmt = $conn->prepare("INSERT into Contacts (Name,Phone,Email,UserID) VALUES(?,?,?,?)");
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
    $stmt->bind_param('i', $contactId);

    $stmt->execute();
    $conn->close();
    returnWithError("");
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

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>