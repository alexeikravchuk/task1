import React, { useState } from 'react';
import { Input, List, Modal, Button, Radio, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectedItemId, selectObjects, setSelectedObjectId, IObject, changeCoordinate, setObjectsByXY } from '../../features/grid/gridSlice';
import './control.scss';

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
    dispatch(changeCoordinate({ value, coordinateName }))
  }

  const handleOk = () => {
    const { posX, posY } = newObjectCoordinates;
    const newId = objects[objects.length - 1].id + 1;
    dispatch(setObjectsByXY(posX, posY, { id: newId, name: `dot${newId}`, color }));
    setVisibleModal(false);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

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
                description={` Position: X = ${item.posX}, Y = ${item.posY}`}
              />
            </List.Item>
          )}
        />
        <div className="control-inputs">
          <p className="control-inputs--title">Переместить объект</p>
          <Input.Group compact>
            <Input
              type='number'
              max={30}
              min={-30}
              style={{ width: '40%' }}
              prefix={"X: "}
              value={objects.find((item: IObject) => item.id === selectedItem)?.posX}
              onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posX')} />
            <Input
              type='number'
              max={30}
              min={-30}
              style={{ width: '40%', marginLeft: '5px' }}
              prefix={" Y: "}
              value={objects.find((item: IObject) => item.id === selectedItem)?.posY}
              onChange={({ target: { value } }) => onPositionChange(parseInt(value), 'posY')} />
          </Input.Group>
        </div>

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
          />
          <Input
            type='number'
            max={30}
            min={-30}
            style={{ width: '20%', marginLeft: '5px' }}
            prefix={" Y: "}
            onChange={({ target: { value } }) => setNewObjectCoordinates({ ...newObjectCoordinates, posY: +value })}
          />
        </Modal>

      </div>

    </>
  );
}