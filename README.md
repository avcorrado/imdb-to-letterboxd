# IMDb to Letterboxd Rating Extension

This Firefox extension enhances the IMDb experience by scraping the Letterboxd rating for movies and displaying it directly on IMDb movie pages. In addition, it provides a button that redirects users to the corresponding Letterboxd page for the selected movie.

## Features

- **Rating Display**: Fetches and displays the Letterboxd rating for the current movie on IMDb.
- **Seamless Navigation**: Includes a button that redirects users to the Letterboxd page for the selected movie.

## Installation

You can download the extension from the [Firefox Add-ons store](https://addons.mozilla.org/firefox/addon/imdb-to-letterboxd-rating/).

## Permissions

The extension requires the following permissions:

- `activeTab`: Allows the extension to interact with the current tab the user is on.
- `https://www.imdb.com/*`: Grants access to IMDb movie pages.
- `https://letterboxd.com/*`: Enables fetching data from Letterboxd movie pages.

### Why These Permissions Are Needed

- **`activeTab`**: Necessary for the extension to interact with the currently active IMDb tab.
- **`https://www.imdb.com/*`**: Required to access and modify IMDb movie pages.
- **`https://letterboxd.com/*`**: Essential for fetching the Letterboxd ratings.

## Usage

1. Navigate to any IMDb movie page.
2. The Letterboxd rating will be displayed next to the IMDb rating.
3. Click the "Letterboxd" button to redirect to the corresponding Letterboxd page for the selected movie.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you have suggestions or encounter any problems.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- [Letterboxd](https://letterboxd.com/) for providing the movie rating platform.
- [Mozilla](https://developer.mozilla.org/) for their documentation on Firefox extensions.
