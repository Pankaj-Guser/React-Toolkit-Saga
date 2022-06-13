import React from "react";
import { useDispatch } from "react-redux";
import tableActions from "../../actions/tableActions";
import Button from "terra-button";
import Spacer from "terra-spacer";

// import classNames from 'classnames/bind';
// import DialogModal from 'terra-dialog-modal';
// import styles from './DialogModalWithCustomHeaderAndCustomFooter.module.scss';
// import InputFieldComp from "../inputField/inputField";
import "../table/table.scss";
import "./Spacer.module.scss";

// const cx = classNames.bind(styles);
function ActionItemsComp(props) {
  const dispatch = useDispatch();
  const { selectedKey, cell1Value, cell2Value } = props;

  // const [isOpen, setIsOpen] = useState(false)
  const RemoveSelected = () => {
    dispatch({ type: tableActions.DELETE_SINGLE_ROW_DATA, selectedKey });
  };
  // const handleOpenModal =() =>{
  //   setIsOpen(true );
  // }

  // const handleCloseModal =() => {
  //   setIsOpen(false );
  // }
  // const text = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  //     'Maecenas molestie in lorem vel facilisis. Quisque ac enim nec lectus malesuada faucibus.',
  //     'Integer congue feugiat ultricies.',
  //     ' Nunc non mauris sed tellus cursus vestibulum nec quis ipsum.',
  //     'Vivamus ornare magna justo, et volutpat tortor congue ut. Nulla facilisi.',
  //     ' Cras in venenatis turpis. Nullam id odio justo. Etiam vehicula lectus vel purus consectetur cursus id sit amet diam.',
  //     'Donec facilisis dui non orci hendrerit pharetra. Suspendisse blandit dictum turpis, in consectetur ipsum hendrerit eget.',
  //     'Nam vehicula, arcu vitae egestas porttitor,',
  //     'turpis nisi pulvinar neque, ut lacinia urna purus sit amet elit.'];
  
  const UpdateSelected = () => {
    const updatedCellData = {
      knowledge_basis: {
        facility_cd: cell1Value,
        primary_criteria_cd: cell2Value,
      },
    };
    dispatch({
      type: tableActions.UPDATE_SINGLE_ROW_DATA,
      selectedKey,
      updatedCellData,
    });
  };

  const AddElement = () => {
    const createdCellData = {
      knowledge_basis: {
        facility_cd: cell1Value,
        primary_criteria_cd: cell2Value,
        locale_code: {
          code: cell1Value,
          locale: cell1Value,
        },
      },
    };
    dispatch({ type: tableActions.ADD_SINGLE_ROW_DATA, createdCellData });
  };
console.log("selected key >>>>>", selectedKey)
  return (
    <>
    {/* <DialogModal
          ariaLabel="Dialog Modal"
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          header={(
            <div >
              Custom Header
              <Button id="close-dialog-modal" text="Close"  onClick={handleCloseModal} />
            </div>
)}
          footer={<div>Custom Footer</div>}
        >
          <p>{text}</p>
        </DialogModal>
        <Button text="Trigger Dialog Modal" onClick={handleOpenModal} /> */}
      <div className="float-right" >
        <Spacer
          className="spacerdemoprimary"
          padding="large small"
          isInlineBlock
        >
          <Button text="Create" onClick={AddElement}>
            Add
          </Button>
        </Spacer>
        <Spacer
          className="spacerdemodefault"
          paddingTop="large"
          paddingBottom="large"
          paddingLeft="small"
          paddingRight="small"
          marginTop="medium"
          marginBottom="medium"
          isInlineBlock
        >
          <Button isDisabled={selectedKey.length> 0 || selectedKey[0] !== undefined ? false : true} text="Update" onClick={UpdateSelected}>
            Update
          </Button>
        </Spacer>
        <Spacer
          className="spacerdemodefault"
          paddingTop="large"
          paddingBottom="large"
          paddingLeft="small"
          paddingRight="small"
          marginTop="medium"
          marginBottom="medium"
          isInlineBlock
        >
          <Button isDisabled={selectedKey.length> 0 || selectedKey[0] !== undefined ? false : true} text="Remove" onClick={RemoveSelected}>
            Remove
          </Button>
        </Spacer>
      </div>
    </>
  );
}

export default ActionItemsComp;
