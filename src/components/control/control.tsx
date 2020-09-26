import React, { useState } from 'react';
import { Input, List, Modal, Button, Radio, Divider, Form, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectedItemId, selectObjects, setSelectedObjectId, IObject, changeCoordinate, setObjectsByXY, setCoordinates, deleteObject } from '../../features/grid/gridSlice';
import './control.scss';
import { calculateNewCoordinatesByDistance, calculateNewCoordinatesByReference } from './helpers';

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
      showMessage(false, 'Выберите объект из списка');
    }
    dispatch(changeCoordinate({ value, coordinateName }))
  }

  const moveObjectByDistance = (values: { distance: string; direction: string }) => {
    if (!selectedItem) {
      showMessage(false, 'Выберите объект из списка');
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
      showMessage(false, 'Выберите объект из списка');
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
    showMessage(true, 'Объект успешно создан');
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
                description={` Position: X = ${item.posX.toFixed(2)}, Y = ${item.posY.toFixed(2)}`}
              />
              <div onClick={(e) => e.stopPropagation()}>
                <Popconfirm title="Sure to delete?"
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
                Переместить
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ margin: '10px 0' }} />
          <p className="control-inputs--title">Переместить объект на расстояние:</p>
          <Form
            layout="inline"
            onFinish={moveObjectByDistance}
            initialValues={{ distance: "0", direction: "0" }}
          >
            <Form.Item name="distance" label="расстояние: ">
              <Input
                type='number'
                max={90}
                min={-90}
              />
            </Form.Item>
            <Form.Item name="direction" label="угол, °: ">
              <Input
                type='number'
                max={3600}
                min={-3600}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%", maxWidth: "300px" }}>
                Переместить
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => setVisibleModal(true)}>
          Добавить объект
        </Button>
        <Modal
          className="modal"
          title="Добавить объект"
          visible={isVivibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Сохранить"
          cancelText="Отмена"
        >
          <Radio.Group value={color} onChange={({ target: { value } }) => setColor(value)}>
            <Radio.Button value="black" style={{ color: "black" }}>Черный</Radio.Button>
            <Radio.Button value="yellow" style={{ color: "#de4" }}>Желтый</Radio.Button>
            <Radio.Button value="red" style={{ color: "red" }}>Красный</Radio.Button>
            <Radio.Button value="blue" style={{ color: "blue" }}>Синий</Radio.Button>
            <Radio.Button value="magenta" style={{ color: "magenta" }}>Розовый</Radio.Button>
            <Radio.Button value="green" style={{ color: "green" }}>Зеленый</Radio.Button>
            <Radio.Button value="gray" style={{ color: "gray" }}>Серый</Radio.Button>
            <Radio.Button value="brown" style={{ color: "brown" }}>Коричневый</Radio.Button>
            <Radio.Button value="violet" style={{ color: "violet" }}>Фиолетовый</Radio.Button>
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