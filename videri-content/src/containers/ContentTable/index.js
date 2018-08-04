// @flow
import React from "react";
import "./index.scss";

export const ContentTable = (content) => {
    const { items } = content;
    console.warn(items);
    // limit 50 per page
    return (
        <div className="ContentTable">
        { items && items.map(item => { 
            return (
                <div className="content">
                    { console.warn(item) }
                </div>
            )})
        }
        </div>
    );
}; 

export default ContentTable;
