document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const id = event.target.dataset.id
    const newTitle = prompt('Введите новое название:')
    if (newTitle !== null) {
      await edit(id, newTitle)
      document.getElementById(`note${id}`).textContent = newTitle
    }
  }

  if (event.target.classList.contains('remove-btn')) {
    const id = event.target.dataset.id
    await remove(id)
    document.getElementById(`note${id}`).parentNode.remove()
  }
})

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle }),
  })
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  })
}
