/**
 *
 * @param {*} ref - reference to the location of the item in the database
 * @param {*} callback -
 * @param {*} options -
 */
export const onSnapshot = (ref, callback, options) => {
  //listens in when theres a update in the database. if items in db updates, it get a new snapshot
  ref.onSnapshot((snapshot) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    items = options && options.sort ? items.sort(options.sort) : items;

    callback(items);
  });
};

export const addDoc = (ref, { id, ...data }) => {
  const doc = id ? ref.doc(id) : ref.doc();
  doc.set(data).then(() => {
    console.log("add new item");
  });
};

export const updateDoc = (ref, id, data) => {
  ref
    .doc(id)
    .set(data)
    .then(() => {
      console.log(`updated item ${id}`);
    });
};

export const removeDoc = (ref, id) => {
  ref
    .doc(id)
    .delete()
    .then(() => {
      console.log(`Remove item: ${id}`);
    });
};
