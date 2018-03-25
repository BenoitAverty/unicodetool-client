import Head from 'next/head'
import { Container, Nav, NavItem, NavLink } from 'reactstrap'

const Layout = props => (
  <div>
    <Head>
      <title>UnicodeTool</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />
    </Head>
    <Container>
      <div className="header clearfix">
        <nav>
          <Nav className="float-right">
            <NavItem>
              <NavLink href="/about">À propos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/BenoitAverty/unicodetool-client">Github</NavLink>
            </NavItem>
          </Nav>
        </nav>

        <h3 id="page-title" className="text-muted">
          UnicodeTool
        </h3>
      </div>
      {props.children}
      <footer className="footer">
        <p>Made with React, Redux and Next.js. Hosted on Now.</p>
      </footer>
    </Container>

    <style jsx>
      {`
        .footer {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          color: #777;
          border-top: 0.05rem solid #e5e5e5;
        }

        .header {
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 0.05rem solid #e5e5e5;
        }
      `}
    </style>
    <style jsx global>
      {`
        body {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
      `}
    </style>
  </div>
)

export default Layout
