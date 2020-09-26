import React, { useState } from 'react';
import { Input, List, Modal, Button, Radio, Divider, Form, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedItemId, selectObjects, setSelectedObjectId, IObject, defaultObject,
  changeCoordinate, setObjectsByXY, setCoordinates, deleteObject
} from '../../features/grid/gridSlice';
import { calculateNewCoordinatesByDistance, calculateNewCoordinatesByReference } from './helpers';
import {
  ADD_OBJECT, ANGLE, CANCEL, CANCEL_TEXT, COLORS, COORDINATES_MAX_VALUE, COORDINATES_MIN_VALUE,
  DISTANCE, MOVE, MOVE_AROUNT_REFERENCE, MOVE_BY_COORDINATES, MOVE_DISTANCE, MOVE_SPEED,
  OBJECT_COORDINATES, OBJECT_CREATED_MSG, OK_TEXT, POSITION, ROTATE_ANGLE_MAX_VALUE, ROTATE_ANGLE_MIN_VALUE, ROTATE_SPEED,
  SAVE, SELECT_OBJECT_MSG, SURE_DELETE_MSG,
} from '../../constants';
import './control.scss';

export function Control() {
  const objects = useSelector(selectObjects);
  const selectedItem = useSelector(selectedItemId);
  const dispatch = useDispatch();
  const [isVivibleModal, setVisibleModal] = useState(false);
  const [color, setColor] = useState('black');
  const [newObjectCoordinates, setNewObjectCoordinates] = useState({ posX: 0, posY: 0 })

  const moveObjectByDistance = (values: { distance: string; direction: string }) => {
    if (!selectedItem) {
      showMessage(false, SELECT_OBJECT_MSG);
      return;
    }
    const { distance, direction } = values;
    const currentObject = getCurrentObject();
    let startDistance = 0;

    function move() {
      if (currentObject) {
        const originalPoint = { x: currentObject.posX, y: currentObject.posY };
        const target = calculateNewCoordinatesByDistance(originalPoint, startDistance, +direction);
        dispatch(setCoordinates({ posX: target.x, posY: target.y }));
      }
      if (+distance > 0) startDistance += MOVE_SPEED;
      else startDistance -= MOVE_SPEED;
      if (Math.abs(startDistance) <= Math.abs(+distance)) {
        requestAnimationFrame(move);
      }
    }

    requestAnimationFrame(move);
  }

  const moveObjectAraund = (values: { pointX: string; pointY: string; angle: string }) => {
    if (!selectedItem) {
      showMessage(false, SELECT_OBJECT_MSG);
      return;
    }
    const { pointX, pointY, angle } = values;
    const currentObject = getCurrentObject();
    let startAngle = 0;

    function rotate() {
      if (currentObject) {
        const originalPoint = { x: currentObject.posX, y: currentObject.posY };
        const referencePoint = { x: +pointX, y: +pointY };
        const target = calculateNewCoordinatesByReference(originalPoint, referencePoint, startAngle);
        dispatch(setCoordinates({ posX: target.x, posY: target.y }));
      }
      if (+angle > 0) startAngle += ROTATE_SPEED;
      else startAngle -= ROTATE_SPEED;
      if (Math.abs(startAngle) <= Math.abs(+angle)) {
        requestAnimationFrame(rotate);
      }
    };

    requestAnimationFrame(rotate);
  }

  const handleOk = () => {
    const { posX, posY } = newObjectCoordinates;
    const newId = objects[objects.length - 1].id + 1;
    dispatch(setObjectsByXY(posX, posY, { id: newId, name: `dot${newId}`, color }));
    showMessage(true, OBJECT_CREATED_MSG);
    setVisibleModal(false);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteObject({ id }));
  }

  const onClickItem = (id: number) => {
    dispatch(setSelectedObjectId(id));
  }

  const onPositionChange = (value: number, coordinateName: string) => {
    if (!selectedItem) {
      showMessage(false, SELECT_OBJECT_MSG);
      return;
    }
    dispatch(changeCoordinate({ value, coordinateName }))
  }

  const getCurrentObject = (): IObject => {
    return objects.find((item: IObject) => item.id === selectedItem) || defaultObject;
  }

  return (
    <div className="control-block">
      <List
        className="item-list"
        itemLayout="horizontal"
        dataSource={objects}
        renderItem={item => (
          <List.Item
            className={`item-list--item${item.id === selectedItem ? ' selected' : ''}`}
            onClick={() => onClickItem(item.id)}>
            <div className="item-list--item_dot" style={{ backgroundColor: `${item.color}` }} />
            <span className="item-list--item_name" style={{ color: `${item.color}` }}>{item.name}</span>
            <List.Item.Meta
              description={`${POSITION}: X = ${item.posX.toFixed(2)}, Y = ${item.posY.toFixed(2)}`}
            />
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm title={SURE_DELETE_MSG}
                okText={OK_TEXT}
                cancelText={CANCEL_TEXT}
                onConfirm={() => handleDelete(item.id)}>
                <DeleteTwoTone />
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
      <div className="control-inputs">
        <p className="control-inputs--title">{`${MOVE_BY_COORDINATES}:`}</p>
        <Input.Group compact>
          <label htmlFor='pointA'>X: </label>
          <Input
            id='pointA'
            type='number'
            max={COORDINATES_MAX_VALUE}
            min={COORDINATES_MIN_VALUE}
            className="control-inputs--input"
            value={getCurrentObject().posX.toFixed(2)}
            onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posX')} />
          <label htmlFor='pointA' className="input-label">Y:</label>
          <Input
            id='pointB'
            type='number'
            max={COORDINATES_MAX_VALUE}
            min={COORDINATES_MIN_VALUE}
            className="control-inputs--input"
            value={getCurrentObject().posY.toFixed(2)}
            onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posY')} />
        </Input.Group>
        <Divider style={{ margin: '10px 0' }} />
        <p className="control-inputs--title">{MOVE_AROUNT_REFERENCE}:</p>
        <Form
          layout="inline"
          onFinish={moveObjectAraund}
          initialValues={{ pointX: "0", pointY: "0", angle: "30" }}
        >
          <Form.Item name="pointX" label="X: ">
            <Input
              type='number'
              max={COORDINATES_MAX_VALUE}
              min={COORDINATES_MIN_VALUE}
            />
          </Form.Item>
          <Form.Item name="pointY" label="Y: ">
            <Input
              type='number'
              max={COORDINATES_MAX_VALUE}
              min={COORDINATES_MIN_VALUE}
            />
          </Form.Item>
          <Form.Item name="angle" label={`${ANGLE}, °: `}>
            <Input
              type='number'
              max={ROTATE_ANGLE_MAX_VALUE}
              min={ROTATE_ANGLE_MIN_VALUE}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {MOVE}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '10px 0' }} />
        <p className="control-inputs--title">{`${MOVE_DISTANCE}:`}</p>
        <Form
          layout="inline"
          onFinish={moveObjectByDistance}
          initialValues={{ distance: "0", direction: "0" }}
        >
          <Form.Item name="distance" label={`${DISTANCE}: `}>
            <Input
              type='number'
              max={COORDINATES_MAX_VALUE * 3}
              min={COORDINATES_MIN_VALUE * 3}
            />
          </Form.Item>
          <Form.Item name="direction" label={`${ANGLE}, °: `}>
            <Input
              type='number'
              max={ROTATE_ANGLE_MAX_VALUE}
              min={ROTATE_ANGLE_MIN_VALUE}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%", maxWidth: "300px" }}>
              {MOVE}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider style={{ margin: '10px 0' }} />
      <Button type="primary" onClick={() => setVisibleModal(true)}>
        {ADD_OBJECT}
      </Button>
      <Modal
        className="modal"
        title={ADD_OBJECT}
        visible={isVivibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={SAVE}
        cancelText={CANCEL}
      >
        <Radio.Group value={color} onChange={({ target: { value } }) => setColor(value)}>
          {Object.keys(COLORS).map((color) => (
            <Radio.Button key={color} value={color} style={{ color }}>{COLORS[color]}</Radio.Button>
          ))}
        </Radio.Group>
        <Divider />
        <p className="control-inputs--title">{OBJECT_COORDINATES}</p>
        <Input
          type='number'
          max={COORDINATES_MAX_VALUE}
          min={COORDINATES_MIN_VALUE}
          style={{ width: '20%' }}
          prefix={"X: "}
          onChange={({ target: { value } }) => setNewObjectCoordinates({ ...newObjectCoordinates, posX: +value })}
          value={newObjectCoordinates.posX}
        />
        <Input
          type='number'
          max={COORDINATES_MAX_VALUE}
          min={COORDINATES_MIN_VALUE}
          style={{ width: '20%', marginLeft: '5px' }}
          prefix={" Y: "}
          onChange={({ target: { value } }) => setNewObjectCoordinates({ ...newObjectCoordinates, posY: +value })}
          value={newObjectCoordinates.posY}
        />
      </Modal>
    </div>
  );
}

function showMessage(isSuccess: boolean, text: string): void {
  isSuccess ? message.success(text) : message.error(text);
}