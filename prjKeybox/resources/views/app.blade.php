<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="X-CSRF-TOKEN" content="{{csrf_token()}}">
        <title>Keybox</title>

        <style>
            html,body{
                width:100%;
                height:100%;
                margin:0px;
                padding:0px;
                overflow:hidden;
            }
        </style>

    </head>
    <body>
        <div  id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
