<?php
$inData = getRequestInfo();

$name = $inData["name"];
$userId = $inData["userId"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT Id FROM Contacts WHERE Name like ? AND UserID = ?");
    $name = "%" . $inData["name"] . "%";
    $stmt->bind_param("ss", $name, $userId);
    $stmt->execute();

    $searchResults = "";
    $searchCount = 0;

    $result = $stmt->get_result();

    while($row = $result->fetch_assoc())
    {
        if( $searchCount > 0 )
        {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '"' . $row["Id"] . '"';
    }

    if( $searchCount == 0 )
    {
        returnWithError( "No Records Found" );
    }
    else
    {
        returnWithInfo( $searchResults );
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

function returnWithInfo( $searchResults )
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>