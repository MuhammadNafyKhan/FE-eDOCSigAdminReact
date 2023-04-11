import { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { colors } from "../../constants";
import { IParticipants } from "../../interface";
import DraggableListItem from "./Draggablelistitem";
import { reorder } from "./helpers";

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  width: "100%",
});

interface IState {
  items: IParticipants[];
}
interface IProps {
  items: IParticipants[];
}

class List extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: props.items.map((p, i) => {
        p.color = colors[i % 4];
        return p;
      }),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item: IParticipants, index: number) => (
                <Draggable
                  key={item.key}
                  draggableId={item.key.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <DraggableListItem item={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default List;
