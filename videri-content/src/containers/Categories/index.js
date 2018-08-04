// @flow
import React from "react";

export const Categories = (categories) => {
    const { items } = categories;

    return (
        <div className="Categories">
            {
                items.map((key, item) => {
                    return (
                        <div key={key} className="folder">
                            <img src="../../images/folder_off.png" alt="folder" />
                            <br/>
                            <span className="name">
                                { isNaN(item) ? item : `Folder_0${item}` }
                            </span>
                        </div>
                    );
                })
            }
            <div className="addFolder">
                New Folder
            </div>
        </div>
    );
}

export default Categories;
