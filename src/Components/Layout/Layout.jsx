import PropTypes from "prop-types";

function Layout({ children }) {
    Layout.propTypes = {
        children: PropTypes.node.isRequired
    }

  return (
    <div className="flex items-center flex-col bg-slate-200 mt-2">
      {children}
    </div>
  )
}

export default Layout;