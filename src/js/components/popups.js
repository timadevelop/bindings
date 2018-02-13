import Popup from 'react-popup'
import React from "react"
import ReactDom from 'react-dom'

// init popup element
ReactDom.render(
    <Popup />,
    document.getElementById('popupContainer')
);

Popup.registerPlugin('popover', function (content, target) {
    this.create({
        content: content,
        className: 'popover',
        noOverlay: true,
        position: function (box) {
            let bodyRect      = document.body.getBoundingClientRect();
            let btnRect       = target.getBoundingClientRect();
            let btnOffsetTop  = btnRect.top - bodyRect.top;
            let btnOffsetLeft = btnRect.left - bodyRect.left;
            let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});

// Popup.plugins().popover('This popup will be displayed right above this button.', element);


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


let contactPopup = Popup.register({
        title: 'Contact me',
        content: "Hello, my name is Vlad. You can write me on timadevelop@gmail.com or find me in SN as @teemofeev",
        buttons: {
            left: [],
            right: [
              {
                text: 'Tweet me',
                className: 'middle',
                action: () => {
                  openInNewTab('https://twitter.com/teemofeev');
                }
              }
              ,{
                text: 'My GitHub',
                className: 'success',
                action: () => {
                  openInNewTab('https://github.com/timadevelop');
                }
              }
              ,{
                text: 'Mail me',
                className: 'danger',
                action: () => {
                  openInNewTab('timadevelop@gmail.com');
                }
              }
              ,{
                text: 'Facebook',
                action: () => {
                  openInNewTab('https://facebook.com/teemofeev');
                }
              }
            ]
        }
    });

function ErrorPopup(msg) {
  const str = msg + " If you really want to use it contact me, contribute or open a new issue on GitHub, so I know which feature you want to use."
  return Popup.register({
          title: 'Sorry, this feature is Not implemented yet :(',
          content: str,
          buttons: {
              left: [],
              right: [
                {
                  text: 'Contact',
                  className: 'success',
                  action: () => {
                    Popup.queue(contactPopup);
                    Popup.close();
                  }
                }
                ,{
                  text: 'Contribute',
                  className: 'middle',
                  action: () => {
                    openInNewTab('https://github.com/timadevelop/bindings');
                    Popup.close();
                  }
                }
                ,{
                  text: 'New issue',
                  className: 'danger',
                  action: () => {
                    openInNewTab('https://github.com/timadevelop/bindings/issues');
                    Popup.close();
                  }
                }
                ,{
                  text: 'Cancel',
                  action: Popup.close
                }
              ]
          }
      })
}

const notImplementedPopup = ErrorPopup("");
export { notImplementedPopup, contactPopup, ErrorPopup }
