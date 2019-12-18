/*import*/
import React, { Component } from "react";

/* Class: NotFound
 * 404 component
 * Redirect all broken links on GhostPage domain
 */
class NotFound extends Component {
    render() {
        return (
            <div className="404">
                <h2>404</h2>
                <p>Page not found.</p>
            </div>
        );
    }
}
/*export notfound*/
export default NotFound;