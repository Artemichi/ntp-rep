import React, { useState, useEffect } from 'react'
import app from '../database/firebase'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}

const Board = () => {
  const [columns, setColumns] = useState(null)
  const [projectInfo, setProjectInfo] = useState(null)
  const theme = useTheme()

  useEffect(() => {
    app
      .firestore()
      .collection('board')
      .doc('bDxfJdavzco1ZyNhYQUL')
      .get()
      .then((snapshot) => {
        setProjectInfo(snapshot.data().info)
        setColumns(snapshot.data().columns)
      })
  }, [])

  const sync = async () => {
    app.firestore().collection('board').doc('bDxfJdavzco1ZyNhYQUL').update({
      columns: columns,
    })
  }

  return (
    <>
      {columns !== null ? (
        <>
          <Typography variant='h3' gutterBottom align='center' color='textPrimary'>
            {`${projectInfo.title} (${projectInfo.stage})`}
          </Typography>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton aria-label='save' color='primary' onClick={() => sync()}>
              <SaveIcon fontSize='large' />
            </IconButton>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', marginTop: '4em' }}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    key={columnId}
                  >
                    <Typography variant='h5' gutterBottom color='textPrimary'>
                      {column.name}
                    </Typography>
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: theme.palette.background.default,
                                padding: 20,
                                width: 300,
                                minHeight: 600,
                                border: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: 8,
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => {
                                      return (
                                        <Paper
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: 'none',
                                            padding: 10,
                                            margin: '0 0 14px 0',
                                            minHeight: '50px',
                                            boxShadow: snapshot.isDragging
                                              ? '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
                                              : '',
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {item.content}
                                        </Paper>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                              {provided.placeholder}
                            </div>
                          )
                        }}
                      </Droppable>
                    </div>
                  </div>
                )
              })}
            </DragDropContext>
          </div>
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}

export default Board
