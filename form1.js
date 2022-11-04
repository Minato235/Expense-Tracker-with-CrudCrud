document
  .getElementById('my-form')
  .addEventListener('submit', async function submit(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    try {
      const obj = {
        amount,
        description,
        category,
      };

      const response = await axios.post(
        `https://crudcrud.com/api/e795df8a435a48f99d84464c7012adb4/etLog`,
        obj
      );

      if (response.status === 201) {
        console.log(response.data);
        displayUserLog(response.data);

        // document.getElementById('my-form');
        // document.getElementById('amount');
      } else {
        alert(`404 error`);
      }
    } catch (error) {
      console.log('Check with the url404 error');
    }
  });

window.onload = async function () {
  try {
    const response = await axios.get(
      `https://crudcrud.com/api/e795df8a435a48f99d84464c7012adb4/etLog`
    );

    for (var i = 0; i < response.data.length; i++) {
      displayUserLog(response.data[i]);
    }
  } catch (err) {
    alert(`404 error `);
  }
};
function displayUserLog(user) {


  const parentNode = document.getElementById('items');
  const childHTML = `<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category}
                            <button onclick=deleteExistingUser('${user._id}')> Delete User </button> 
                            <button onclick=editUserDetails('${user.amount}','${user.description}','${user._id}')> Edit User </button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}




async function deleteExistingUser(user_id) {
  try {
    const reqId = await axios.delete(
      `https://crudcrud.com/api/e795df8a435a48f99d84464c7012adb4/etLog/${user_id}`
    );

    deleteUser(user_id);
  } catch (error) {
    console.log('404 error');
  }
}

function editUserDetails(amount, description, user_id) {
  document.getElementById('amount').value = amount;
  document.getElementById('description').value = description;
  deleteExistingUser(user_id);
}

function deleteUser(id) {
  const parentNode = document.getElementById('items');
  const childNodeToBeDeleted = document.getElementById(id);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
