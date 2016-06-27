/*******************************
* <!--TEMPLATES -->
********************************/


module.exports = {
  friendList: `
      <li class="side--friend">
        <img src=" <%= image %> " alt="" />
        <span><%= name %></span>
      </li>
  `,
  mainFeed(friend, id) {
    return `
        <img src='${friend.picture.medium}' data-id='${id}' />
        <p data-id='${id}'>The Ghost of <br>
        <b> ${friend.name.first}</b>
        <br> Says hi.</p>
    `
  }
}
