module Main exposing (..)

import Html exposing (Html, Attribute, text, div, input, section, button, ul, li, p, label, h3)
import Html.Events exposing (onInput, onClick, onCheck)
import Html.Attributes exposing (placeholder, type', for, id, value, class, checked)
import Html.App as App
import String


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



-- Update


type Msg
    = UpdateInput String
    | Add
    | Hide
    | Remove
    | Complete Int Bool


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateInput input ->
            { model | input = input } ! []

        Add ->
            { model
                | currentId = model.currentId + 1
                , input = ""
                , todos =
                    if String.isEmpty model.input then
                        model.todos
                    else
                        model.todos ++ [ createTodo model.input model.currentId ]
            }
                ! []

        Hide ->
            { model | display = not model.display } ! []

        Remove ->
            { model | todos = (List.filter notCompleted model.todos) } ! []

        Complete id isComplete ->
            let
                updateTodo t =
                    if t.id == id then
                        { t | completed = isComplete }
                    else
                        t
            in
                { model | todos = List.map updateTodo model.todos } ! []


createTodo : String -> Int -> Todo
createTodo name id =
    { name = name, completed = False, id = id }


notCompleted : Todo -> Bool
notCompleted todo =
    todo.completed == False



-- view


view : Model -> Html Msg
view model =
    div [ class "fullHeight" ]
        [ section []
            [ div [ class "todoInput" ]
                [ input [ onInput UpdateInput, placeholder "Todo", type' "text", value model.input ] []
                , button [ onClick Add ] [ text "Add Todo" ]
                , button [ onClick Remove ] [ text "Remove Completed" ]
                , toggleVisBtn model.display
                ]
            ]
        ]


toggleVisBtn : Bool -> Html Msg
toggleVisBtn display =
    case display of
        True ->
            button [ onClick Hide ] [ text "Hide Completed" ]

        False ->
            button [ onClick Hide ] [ text "Show Completed" ]