const AddContact=({name,number,handleName,handleNumber,handleAddClick})=>{
    return(
        <form>
        <div>
          name:
          <input value={name} onChange={handleName} />
        </div>
        <div>
          number:
          <input value={number} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>
            add
          </button>
        </div>
      </form>
    )
}
export default AddContact