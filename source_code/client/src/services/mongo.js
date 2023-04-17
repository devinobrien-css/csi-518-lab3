
export const addItem = async (item) => {
    await fetch(`/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(data => console.log(data.result))
};

export const fetchItems = async () => {
    await fetch('/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
          console.log('OUTPUT')
          console.log(data.result)
          return data
      })
};

export const fetchItem = async (item_id) => {
    await fetch(`/items/${item_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Requesting one"
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data.result))
};

export const updateItem = async (item_id,item) => {
    await fetch(`/items/${item_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: item
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data.result))
};

export const deleteItem = async (item_id,item) => {
    await fetch(`/items/${item_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Deleting one"
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data.result))
};