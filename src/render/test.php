<?php
/**
 * Created by PhpStorm.
 * User: hn
 * Date: 14-9-7
 * Time: 13:38
 */

$data = $_REQUEST[ 'data' ];

if ( isset( $data ) ) {
    file_put_contents( "/Users/hn/test.txt", $data );
}

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <form action="" method="POST">
        <textarea name="data"></textarea>
        <button type="submit">提交</button>
    </form>
</html>