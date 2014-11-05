# SEO Strategies for Single Page Applications

You can test the different types of strategies by un-commenting the desired layout page in the `_ViewStart.cshtml`. For example, if you want to see the Angular version, un-comment this line:

```
@{
    //Layout = "~/Views/Shared/_Static.cshtml";
    //Layout = "~/Views/Shared/_Hash.cshtml";
    //Layout = "~/Views/Shared/_History.cshtml";
    Layout = "~/Views/Shared/_Angular.cshtml";
}
```

------------

## Architectural Overview

The concept is simple. Use progressive enhancement techniques to allow the page to operate as a rich web application when JavaScript is available, render real markup on the page and keep the URL in sync with your content.

### Render Markup on First Request

The first step is to render the markup to the page that is appropriate to the given the URL and it's parameters. This could be the full markup of the content that can or will be loaded into the page, or it could be a snapshot of the content. The key here is to have markup rendered in the page that is available for a search engine bot to index.

This works in conjunction with the need to keep the URL updated. This way should you request a page that you navigated to while working with the SPA, the markup for the specific page is rendered upon the first request.

### Intercept Link Clicks/Taps

Once the content is loaded on to the page, then you want to be able to take control of how content is loaded in the application. By taking control of the clicks/taps you can stop the page from making a full request to the selected page and instead make an Ajax request to get the partial page in order to render in the browser.

### Inject Partial Into Container

Once you have the response of the Ajax request then you can inject the partial view into the container in your view. This makes the new content available to the user on the screen.

### Update the URL

Whether you are using the hash or history strategy to keep the URL updated, you must make some sort of change to the URL.

### Clean Up

Once you have effectively "navigated" to a new page by getting the new markup and updating the URL, then you need to finalize the work by updating the page title and handling back and forward button actions to make sure the page is always in sync with the URL.
