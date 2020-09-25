import React, { useState } from 'react';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectedItemId, selectObjects, setSelectedObjectId } from '../grid/gridSlice';
import './control.scss';

export function Control() {
  const objects = useSelector(selectObjects);
  const selectedItem = useSelector(selectedItemId);
  const dispatch = useDispatch();

  const onClickItem = (id: number) => {
    dispatch(setSelectedObjectId(id));
  }

  return (
    <List
      className={'item-list'}
      itemLayout="horizontal"
      dataSource={objects}
      renderItem={item => (
        <List.Item
          className={`item-list--item${item.id === selectedItem ? ' selected' : ''}`}
          onClick={() => onClickItem(item.id)}>
          <div style={{ display: 'inline-block', backgroundColor: `${item.color}`, height: '10px', width: '10px', borderRadius: '50%' }} />
          <span style={{ color: `${item.color}`, marginLeft: '10px' }}>{item.name}</span>
          <List.Item.Meta
            description={`Position: X = ${item.posX}, Y = ${item.posY}`}
          />
        </List.Item>
      )}
    />
  );
}