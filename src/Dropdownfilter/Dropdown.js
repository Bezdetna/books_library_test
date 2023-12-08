import React from "react";

function Dropdown (){
    return (
        <div className="custom-select">
            <select defaultValue="Show Active">
                <option value='Show All'>Show All</option>
                <option value='Show Active'>Show Active</option>
                <option value='Show Deactivated'>Show Deactivated</option>
            </select>
        </div>
    )
}
export default Dropdown