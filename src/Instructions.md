<div markdown="fileTab.file.contents || fileTab.file.markdown" language="fileTab.file.language" class="markdown collapsed"><h1>Robust Server Structure: URL shortener service assignment</h1><h2>Instructions</h2><p>Your task is to build a URL shortener service API using Node.js and Express. It should allow users to submit a URL and receive a "shortened" code, or ID, that can be used to retrieve the original URL later. It should also keep track of how often each shortened URL is retrieved so you can calculate the most popular URL's.</p>
<h3>What is a URL Shortener?</h3><p>The e-commerce company that you work for sells many different products under different categories. For example: <code>www.shoppingsite.com/category/shoe/product/nike132032</code>.</p>
<p>If a customer wants to share a link to the product on Twitter, they may run into restrictions on the text length.</p>
<p>A URL shortener service overcomes this issue by shortening <code>www.shoppingsite.com/category/shoe/product/nike/132032</code> to <code>www.shoppingsite.com/8d13lk2k</code>.</p>
<h2>Existing files</h2><p>You will only need to edit the <code>src</code> folder and to follow code organization principles you learned in this module.</p>
<p>Use the existing data files located in <code>src/data</code> for the responses. Feel free to add or remove data from the files as necessary, but keep the same shape of the data.</p>
<h2>Tasks</h2><h3>Create routes and handlers to create, read, update, delete, and list short urls</h3><p>You will need to create the following API endpoints for the <code>urls</code> resources:</p>
<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>POST</code></td>
<td><code>/urls</code></td>
<td>create a new short url</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/urls/:urlId</code></td>
<td>retrieve a short url by id</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/urls/:urlId</code></td>
<td>update a short url by id</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/urls</code></td>
<td>retrieve a list of all short url's</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/urls/:urlId/uses</code></td>
<td>retrieve a list of use metrics for a given short url id</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/urls/:urlId/uses/:useId</code></td>
<td>retrieve a use metric by id for a given short url id</td>
</tr>
</tbody>
</table>
<p>Short URL's cannot be deleted once created, because this would break existing links.</p>
<h4>Create</h4><p>The following Postman screen shot shows the data posted to <code>/urls</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 425.066px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/a0b51ff416072578801c45fd8b05d2e3-urls-create.png" alt="Create a Short URL in postman" style="width: 563.337px; height: 423.066px; max-width: none;"></div></zoomable-image></p>
<p>POST <code>{ data: {"href":"www.some-url.com"} }</code> to <code>/urls</code> should assign an <code>id</code> to the object, save it, and return the saved object as a response to the client.</p>
<h4>Read</h4><p>The following Postman screen shot shows a GET request to <code>/urls/:urlId</code>, and the response from the server.</p>
<p>Additionally, use records are created as a side-effect of a GET request to <code>/urls/:urlId</code>. Each use record contains an <code>id</code> ,  a <code>urlId</code> which corresponds to id of the URL being tracked by the use metric, and a <code>time</code> property (set to <code>Date.now()</code>) indicating when the use metric was recorded. </p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 312.998px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/abfffb1173078a9e8a22a4fb16c4c63e-urls-read.png" alt="Read a Short URL in postman" style="width: 562.383px; height: 310.998px; max-width: none;"></div></zoomable-image></p>
<h4>Update</h4><p>The following Postman screen shot shows a PUT request to <code>/urls/:urlId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 378.088px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/622b5e95fd1b0c8b4c0760ecc027fdf3-urls-update.png" alt="Update a Short URL in postman" style="width: 563.006px; height: 376.088px; max-width: none;"></div></zoomable-image></p>
<h4>List</h4><p>The following Postman screen shot shows a GET request to <code>/urls</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 360.542px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/b9bcd999b3f7b91deda7c12891fecd46-urls-list.png" alt="Update a Short URL in postman" style="width: 562.86px; height: 358.542px; max-width: none;"></div></zoomable-image></p>
<h4>Delete</h4><p>The following Postman screen shot shows a DELETE request to <code>/urls/:urlId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 318.092px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/4bb4dd3910ef03f377850cf6e9782233-urls-delete.png" alt="Delete a Short URL in postman" style="width: 562.441px; height: 316.092px; max-width: none;"></div></zoomable-image></p>
<h4>List Short URL Uses</h4><p>The following Postman screen shot shows a GET request to <code>/urls/:urlId/uses</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 341.298px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/a5080f3d7dbf1837b1487cef0ce36bdd-urls-uses-list.png" alt="List Short URL uses's in postman" style="width: 562.683px; height: 339.298px; max-width: none;"></div></zoomable-image></p>
<h4>Read Short URL Use</h4><p>The following Postman screen shot shows a GET request to <code>/urls/:urlId/uses/:useId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 319.79px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/e3328aa6e645c1f4902118bedc2e39ba-urls-uses-read.png" alt="List Short URL uses's in postman" style="width: 562.46px; height: 317.79px; max-width: none;"></div></zoomable-image></p>
<p>The service should return a <code>404</code> error if the <code>:urlId</code> and <code>:useId</code> are mis-matched. For example, if you send a GET request to <code>/42/uses/79</code> and useId <code>79</code> is NOT associated with urlId <code>42</code> the server should respond with <code>404</code>.</p>
<h3>Create routes and handlers to create, read, update, delete, and list use metrics related to short urls</h3><p>You will need to create the following API endpoints for the <code>uses</code> resources:</p>
<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>GET</code></td>
<td><code>/uses/:useId</code></td>
<td>retrieve a use metric by id</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/uses/:useId</code></td>
<td>delete a use metric by id</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/uses</code></td>
<td>retrieve a list of all use metrics</td>
</tr>
</tbody>
</table>
<p>The uses resources have a path of <code>/uses</code> and are a record of every <code>GET</code> request for a specific short url.</p>
<h4>Create</h4><p>Creating use records through the API is not allowed. Use records are created as a side-effect of a GET request to <code>/urls/:urlId</code>.</p>
<p>The following Postman screen shot shows the data posted to <code>/urls/:urlId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 414.878px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https:////res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/deca6a811d3bee6d1a9f6cec672d051f-uses-create.png" alt="Create a use in postman" style="width: 563.271px; height: 412.878px; max-width: none;"></div></zoomable-image></p>
<h4>Read</h4><p>The following Postman screen shot shows a GET request to <code>/uses/:useId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 317.526px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/f7e4fe21f9f54f38d6d14ae1443f527e-uses-read.png" alt="Read a use in postman" style="width: 562.435px; height: 315.526px; max-width: none;"></div></zoomable-image></p>
<h4>Update</h4><p>The following Postman screen shot shows a PUT request to <code>/uses/:useId</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 427.896px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/b0b80f2a37af9d988aa2729b11b0fed8-uses-update.png" alt="Update a use in postman" style="width: 563.354px; height: 425.896px; max-width: none;"></div></zoomable-image></p>
<h4>Delete</h4><p>The following Postman screen shot shows a DELETE request to <code>/uses/:useId</code>, and the <code>204</code> response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 264.322px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/735c26ed5220ecff6cc0b9a36ffee489-uses-delete.png" alt="Delete a use in postman" style="width: 561.717px; height: 262.322px; max-width: none;"></div></zoomable-image></p>
<h4>List</h4><p>The following Postman screen shot shows a GET request to <code>/uses</code>, and the response from the server.</p>

<p><zoomable-image zoom-disabled="expandable &amp;&amp; !expanded" class="enabled" style="height: 427.896px;"><!----><span class="zoomable-image-controls" ng-if="$ctrl.enabled" style=""> <button class="btn-default btn-sm icon-expand" ng-click="$ctrl.expandOrContract($event)" tooltip="Make this image as large as possible" type="button"></button> <button class="btn-default btn-sm icon-minus" ng-click="$ctrl.zoomOut($event)" ng-disabled="$ctrl.zoomOutDisabled" tooltip="Zoom Out" type="button" disabled="disabled"></button> <button class="btn-default btn-sm" ng-class="{ active: $ctrl.is100 }" ng-click="$ctrl.zoom100($event)" tooltip="Zoom 1:1 pixels" type="button"> 1:1 </button> <button class="btn-default btn-sm icon-plus" ng-click="$ctrl.zoomIn($event)" ng-disabled="$ctrl.zoomInDisabled" tooltip="Zoom In" type="button"></button> </span><!----> <div class="zoomable-image-scrollbox" ng-transclude="" ng-dblclick="$ctrl.autoZoom($event)" tooltip="You can zoom into this image using the controls, or double-clicking on it" tooltip-position="top" scroll-on-drag="$ctrl.enabled &amp;&amp; $ctrl.zoomed" tabindex="0"><img src="https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/69a2b99e75e48e85815dd8b342dfbd2b-uses-list.png" alt="List uses in postman" style="width: 563.354px; height: 425.896px; max-width: none;"></div></zoomable-image></p>
<h3>Handle errors properly</h3><ul>
<li>Return a <code>404</code> error for any non-existent path or resource</li>
<li>Methods that are not allowed should return <code>405</code> (e.g., a DELETE request sent to <code>/urls/:urlId</code>)</li>
</ul>
<h3>Saving data</h3><p>There is no database in use for this project. All changes are stored in-memory.</p>
<p>The short url data is exported from <code>/src/data/urls-data.js</code>.</p>
<p>The use data is exported from <code>/src/data/uses-data.js</code>.</p>
<p>There is some existing data in each file to give you a starting place.</p>
<p>Add and remove data from the arrays using <code>.push()</code> and <code>.splice()</code> respectively.</p>
<p>When you restart your server, any changes made to these arrays will be lost.</p>
<h3>Assigning ID's</h3><p>ID's are often assigned by the database. Since your API is not connected to a database, you can use <code>array.length + 1</code> to assign ID's, as follows:</p>
<div class="language-tabset"><div class="language-tab language-javascript"><pre><code class="lang-javascript"><span class="hljs-keyword">const</span> newUrlId = urls.length + <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> newUseId = uses.length + <span class="hljs-number">1</span>;
</code></pre>
</div></div><p>However, note that this method of assigning ID's to your database records is <strong>NOT</strong> recommended in practice and is only used in this assignment for simplicity so you can focus on building the API. Later on in the backend module, you will learn about industry-standard databases and better ways to assign ID's  to database records. </p>
<h3>Assigning time property</h3><p>Use <code>Date.now()</code> to assign the time property of uses.</p>
</div>