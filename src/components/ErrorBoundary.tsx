import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section">
          <div className="container">
            <p>Une erreur est survenue. <a href="/">Retour à l'accueil</a></p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
