export const renderList ={
    todo:[
        'complete useref',
        'deep drive on redux',
        'run actions',
        'database full crud operations'
    ],
    complete:[
        'all office tasks'
    ],
    inProgress:[
        'testing dnd'
    ]
}

export const formatTitle = (text) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};
