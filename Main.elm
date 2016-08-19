module Main exposing (..)

import Html.App as App

main : Program Never
main =
    App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }



-- Model


type alias Model =
    { todos : List Todo
    , input : String
    , currentId : Int
    , display : Bool
    }


type alias Todo =
    { name : String
    , completed : Bool
    , id : Int
    }


emptyModel : Model
emptyModel =
    { todos = []
    , input = ""
    , currentId = 0
    , display = True
    }


init : ( Model, Cmd Msg )
init =
    emptyModel ! []
