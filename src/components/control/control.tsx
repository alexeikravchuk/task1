import React, { useState } from 'react';
import { Input, List, Modal, Button, Radio, Divider, Form, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectedItemId, selectObjects, setSelectedObjectId, IObject, changeCoordinate, setObjectsByXY, setCoordinates, deleteObject } from '../../features/grid/gridSlice';
import './control.scss';
import { calculateNewCoordinatesByDistance, calculateNewCoordinatesByReference } from './helpers';
import { ADD_OBJECT, ANGLE, CANCEL, COLORS, DISTANCE, MOVE, MOVE_DISTANCE, OBJECT_CREATED_MSG, POSITION, SAVE, SELECT_OBJECT_MSG, SURE_DELETE_MSG } from '../../constants';

export function Control() {
  const objects = useSelector(selectObjects);
  const selectedItem = useSelector(selectedItemId);
  const dispatch = useDispatch();
  const [isVivibleModal, setVisibleModal] = useState(false);
  const [color, setColor] = useState('black');
  const [newObjectCoordinates, setNewObjectCoordinates] = useState({ posX: 0, posY: 0 })

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

  const moveObjectByDistance = (values: { distance: string; direction: string }) => {
    if (!selectedItem) {
      showMessage(false, SELECT_OBJECT_MSG);
      return;
    }
    const { distance, direction } = values;
    const currentObject = objects.find((item: IObject) => item.id === selectedItem);
    let startDistance = 0;

    function move() {
      if (currentObject) {
        const originalPoint = { x: currentObject.posX, y: currentObject.posY };
        const target = calculateNewCoordinatesByDistance(originalPoint, startDistance, +direction);
        dispatch(setCoordinates({ posX: target.x, posY: target.y }));
      }
      if (+distance > 0) startDistance += 0.5;
      else startDistance -= 0.5;
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
    const currentObject = objects.find((item: IObject) => item.id === selectedItem);
    let startAngle = 0;

    function rotate() {
      if (currentObject) {
        const originalPoint = { x: currentObject.posX, y: currentObject.posY };
        const referencePoint = { x: +pointX, y: +pointY };
        const target = calculateNewCoordinatesByReference(originalPoint, referencePoint, startAngle);
        dispatch(setCoordinates({ posX: target.x, posY: target.y }));
      }
      if (+angle > 0) startAngle += 2;
      else startAngle -= 2;
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

  return (
    <>
      <div className="control-block">
        <List
          className="item-list"
          itemLayout="horizontal"
          dataSource={objects}
          renderItem={item => (
            <List.Item
              className={`item-list--item${item.id === selectedItem ? ' selected' : ''}`}
              onClick={() => onClickItem(item.id)}>
              <div style={{ display: 'inline-block', backgroundColor: `${item.color}`, height: '10px', width: '10px', borderRadius: '50%' }} />
              <span style={{ color: `${item.color}`, marginLeft: '10px' }}>{item.name}</span>
              <List.Item.Meta
                description={`${POSITION}: X = ${item.posX.toFixed(2)}, Y = ${item.posY.toFixed(2)}`}
              />
              <div onClick={(e) => e.stopPropagation()}>
                <Popconfirm title={SURE_DELETE_MSG}
                  onConfirm={() => handleDelete(item.id)}>
                  <DeleteTwoTone />
                </Popconfirm>
              </div>

            </List.Item>
          )}
        />
        <div className="control-inputs">
          <p className="control-inputs--title">Переместить объект по координатам:</p>
          <Input.Group compact>
            <Input
              type='number'
              max={30}
              min={-30}
              className="control-inputs--input"
              prefix={"X: "}
              value={objects.find((item: IObject) => item.id === selectedItem)?.posX.toFixed(2)}
              onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posX')} />
            <Input
              type='number'
              max={30}
              min={-30}
              className="control-inputs--input"
              prefix={" Y: "}
              value={objects.find((item: IObject) => item.id === selectedItem)?.posY.toFixed(2)}
              onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posY')} />
          </Input.Group>
          <Divider style={{ margin: '10px 0' }} />
          <p className="control-inputs--title">Переместить объект вокруг координаты:</p>
          <Form
            layout="inline"
            onFinish={moveObjectAraund}
            initialValues={{ pointX: "0", pointY: "0", angle: "30" }}
          >
            <Form.Item name="pointX" label="X: ">
              <Input
                type='number'
                max={30}
                min={-30}
              />
            </Form.Item>
            <Form.Item name="pointY" label="Y: ">
              <Input
                type='number'
                max={30}
                min={-30}
              />
            </Form.Item>
            <Form.Item name="angle" label="угол, °: ">
              <Input
                type='number'
                max={3600}
                min={-3600}
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
                max={90}
                min={-90}
              />
            </Form.Item>
            <Form.Item name="direction" label={`${ANGLE}, °: `}>
              <Input
                type='number'
                max={3600}
                min={-3600}
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
        <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => setVisibleModal(true)}>
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
          <p className="control-inputs--title">Координаты объекта</p>
          <Input
            type='number'
            max={30}
            min={-30}
            style={{ width: '20%' }}
            prefix={"X: "}
            onChange={({ target: { value } }) => setNewObjectCoordinates({ ...newObjectCoordinates, posX: +value })}
            value={newObjectCoordinates.posX}
          />
          <Input
            type='number'
            max={30}
            min={-30}
            style={{ width: '20%', marginLeft: '5px' }}
            prefix={" Y: "}
            onChange={({ target: { value } }) => setNewObjectCoordinates({ ...newObjectCoordinates, posY: +value })}
            value={newObjectCoordinates.posY}
          />
        </Modal>

      </div>

    </>
  );
}

function showMessage(isSuccess: boolean, text: string): void {
  isSuccess ? message.success(text) : message.error(text);
}