import axios from "axios";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiBookAdd } from "react-icons/bi";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { getCookie } from "../../../Cookie/Cookie";
import { getBookletPostURL } from "../../../RestUrls/RestURL";
import BookletContent from "./BookletContent";
import BookletContentEditor from "./BookletContentEditor";
import "./CreateBooklet.css";

/*the Serial Counter Does not get Reset Automatically*/
/*In Case Any kind of Anamoly serial hook has to check first*/
/* and ensure it sets things properly. */

const CreateBooklet = (props) => {
  const [booklet, setbooklet] = useState({
    bookletTitle: "",
    bookletDescription: "",
  });
  const [showContentEditor, setshowContentEditor] = useState(false);

  const [bookletContents, setbookletContents] = useState([]);

  const [serial, setserial] = useState(0);

  const history = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setbooklet((prevBooklet) => {
      return { ...prevBooklet, [e.target.name]: e.target.value };
    });
  };

  const onNewContentButtonClick = (e) => {
    e.preventDefault();
    setshowContentEditor(showContentEditor ^ true);
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      let sourceElement = bookletContents.find(
        (content) => content.serialNo === source.index
      );

      let destinationElement = bookletContents.find(
        (content) => content.serialNo === destination.index
      );

      let modifiedBookletContents = bookletContents.filter(
        (content) =>
          content.serialNo !== source.index &&
          content.serialNo !== destination.index
      );

      sourceElement = { ...sourceElement, serialNo: destination.index };
      destinationElement = { ...destinationElement, serialNo: source.index };

      console.log(sourceElement);
      console.log(destinationElement);

      modifiedBookletContents.push(sourceElement);
      modifiedBookletContents.push(destinationElement);

      setbookletContents(modifiedBookletContents);
    } else {
      /* 
            When thrown Outside of the Booklet Container This code executes also we need to ensure 
            After Deleting a item other items Comes serially 0,1,2,3,... , If any index got skipped or 
            not handled properly it will cause wierd behavior of booklet editor 
            */

      const draggedItemId = parseInt(draggableId.substring(10));
      console.log(draggedItemId);

      let modifiedBookletContents = bookletContents
        .filter((content) => content.serialNo !== draggedItemId)
        .map((prevContent) => {
          return {
            ...prevContent,
            serialNo:
              prevContent.serialNo > draggedItemId
                ? prevContent.serialNo - 1
                : prevContent.serialNo,
          };
        });
      /*
            After Deleting serialNo which greater than the deleted content serial No has to be reduced By 1 
            */

      setbookletContents(modifiedBookletContents);
    }
  };

  const onCreateBookletClick = () => {
    console.log(bookletContents);
    console.log(booklet);

    const jwt = getCookie("jwt");
    const data = { ...booklet, bookletContents: bookletContents };

    if (!jwt) {
      toast("Need TO log in first Before Putting Toast!");
      return;
    }
    const headers = { headers: { Authorization: jwt } };
    axios
      .post(getBookletPostURL(), data, headers)
      .then((res) => {
        console.log(res.data);
        history.push(`/booklet/${res.data.bookletId}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Need To Log in before creating Booklet!");
      });
  };

  return (
    <div className="w3-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          <Droppable droppableId="droppable-2">
            {(provided, snapshot) => (
              <div
                className="col-sm-2 delete-side"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="col-sm-7">
            <div style={{ marginTop: "70px" }} className="booklet">
              <button
                className="create-booklet-button"
                onClick={onCreateBookletClick}
              >
                Create Booklet
              </button>
              <div style={{ marginTop: "20px" }}>
                <p className="booklet-word"> BOOKLET </p>
              </div>
              <div className="booklet-title">
                <form>
                  <input
                    type="text"
                    name="bookletTitle"
                    className="booklet-title-input"
                    placeholder="Title For Booklet"
                    onChange={onChange}
                  />
                </form>
              </div>
              <div className="booklet-description">
                <textarea
                  className="booklet-description-input"
                  name="bookletDescription"
                  placeholder="Write Something Describing Your booklet"
                  onChange={onChange}
                />
              </div>

              <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {bookletContents &&
                      bookletContents
                        .sort((a, b) => a.serialNo - b.serialNo)
                        .map((content, index) => (
                          <BookletContent
                            key={content.serialNo}
                            index={index}
                            content={content}
                            bookletContents={bookletContents}
                            setbookletContents={setbookletContents}
                          />
                        ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <button
                className="new-content-button"
                onClick={onNewContentButtonClick}
              >
                <BiBookAdd style={{ fontSize: "25px" }} /> New Content{" "}
              </button>
              {showContentEditor == true && (
                <BookletContentEditor
                  bookletContents={bookletContents}
                  setbookletContents={setbookletContents}
                  serial={serial}
                  setserial={setserial}
                />
              )}
            </div>
          </div>
          <div className="col"></div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CreateBooklet;
