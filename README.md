<br/>
<p align="center">
  <a href="https://github.com/MeerUzairWasHere/ezSnippets">
    <img src="https://raw.githubusercontent.com/MeerUzairWasHere/ezSnippets/19ef06f5006f111f6349d380ccfe6305b87e6ce6/public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ezSnippets</h3>

  <p align="center">
    Code, Organize, Access.
    <br/>
    <br/>
    <a href="https://github.com/MeerUzairWasHere/ezSnippets"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/MeerUzairWasHere/ezSnippets">View Demo</a>
    .
    <a href="https://github.com/MeerUzairWasHere/ezSnippets/issues">Report Bug</a>
    .
    <a href="https://github.com/MeerUzairWasHere/ezSnippets/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/MeerUzairWasHere/ezSnippets/total) ![Contributors](https://img.shields.io/github/contributors/MeerUzairWasHere/ezSnippets?color=dark-green) ![Forks](https://img.shields.io/github/forks/MeerUzairWasHere/ezSnippets?style=social) ![Stargazers](https://img.shields.io/github/stars/MeerUzairWasHere/ezSnippets?style=social) ![Issues](https://img.shields.io/github/issues/MeerUzairWasHere/ezSnippets) ![License](https://img.shields.io/github/license/MeerUzairWasHere/ezSnippets) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

![Screen Shot](https://raw.githubusercontent.com/MeerUzairWasHere/ezSnippets/main/demo.png)

<b>ezSnippets</b> is a powerful web application designed to simplify code snippet management for developers of all levels. Our mission is to provide a seamless and efficient solution for organizing and accessing code snippets, ultimately enhancing productivity and streamlining the development workflow.

## Built With

e constructed ezSnippets using a robust combination of frameworks and tools to ensure a seamless experience for our users:

- **Frontend**: Next.js powers the frontend user interface, providing flexibility and performance.
- **Backend**: Mongoose and MongoDB handle efficient data storage and management, ensuring reliability and scalability.
- **Authentication**: Clerk streamlines user authentication and management, prioritizing security and ease of use.
- **UI Design**: TailwindCSS, along with either Shadcn-ui, enables customizable and visually appealing user interfaces.
- **Data Fetching**: React Query enhances data fetching capabilities, optimizing performance and responsiveness.

These frameworks and tools form the foundation of ezSnippets, empowering developers to organize and access their code snippets with ease while ensuring a delightful user experience.

## Getting Started

## Installation Instructions

To install and set up ezSnippets locally, follow these steps carefully:

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- MongoDB

### Installation Steps

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/ezSnippets.git
```

2. Navigate to the project directory:

```bash
cd ezSnippets
```

3. Install dependencies using npm:

```bash
npm install
```

### Configuration

1. Set up your MongoDB database and obtain the connection URI.

2. Create a `.env` file in the root directory of the project.

3. Add the following environment variables to your `.env` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGl0ZXJhdGUtYmFiasdasdasdasdmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_n7Ym4r2mbLw3LasdasdasdasdasWrVbpbl9ort
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/snippets
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/snippets
MONGODB_URI=mongodb+srv://username:password@your-mongodb-uri/ezSnippets?retryWrites=true&w=majority
```

Replace `your-mongodb-uri`, `username`, and `password` with your MongoDB connection URI credentials.

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Access ezSnippets in your browser at `http://localhost:3000`.

### That's it!

You have successfully installed and configured ezSnippets locally on your machine. Start organizing your code snippets effortlessly! 🚀

## Usage

### Examples of ezSnippets Usage

#### 1. User Registration and Login


Easily register and log in to your ezSnippets account using Clerk authentication. Seamlessly manage your code snippets with secure access.

#### 2. Code Snippet Management


Effortlessly save, categorize, and retrieve your code snippets with ezSnippets. Add descriptive tags for easy organization and quick access during development.

#### 3. Clipboard Integration


Integrate ezSnippets with your clipboard for efficient code reuse. Swiftly copy code snippets to use in your projects without interrupting your workflow.

#### 4. Responsive Design


Enjoy a seamless experience across different devices and screen sizes with ezSnippets' responsive design. Access your code snippets anytime, anywhere.
 

## Roadmap

See the [open issues](https://github.com/MeerUzairWasHere/ezSnippets/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/MeerUzairWasHere/ezSnippets/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/MeerUzairWasHere/ezSnippets/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/MeerUzairWasHere/ezSnippets/blob/main/LICENSE.md) for more information.
