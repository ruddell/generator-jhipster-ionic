package <%=packageName%>.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.csrf.CsrfException;
import org.springframework.security.web.csrf.CsrfToken;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/**
 * An implementation of AccessDeniedHandler by wrapping the AccessDeniedHandlerImpl.
 *
 * In addition to sending a 403 (SC_FORBIDDEN) HTTP error code, it will remove the invalid CSRF cookie from the browser
 * side when a CsrfException occurs. In this way the browser side application, e.g. JavaScript code, can
 * distinguish the CsrfException from other AccessDeniedExceptions and perform more specific operations. For instance,
 * send a GET HTTP method to obtain a new CSRF token.
 *
 * @see AccessDeniedHandlerImpl
 */
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    private final Logger log = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);

    private AccessDeniedHandlerImpl accessDeniedHandlerImpl = new AccessDeniedHandlerImpl();

    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {

        if (accessDeniedException instanceof CsrfException && !response.isCommitted()) {
            // Remove the session cookie so that client knows it's time to obtain a new CSRF token
            String pCookieName = "CSRF-TOKEN";
            Cookie cookie = new Cookie(pCookieName, "");
            cookie.setMaxAge(0);
            cookie.setHttpOnly(false);
            cookie.setPath("/");
            response.addCookie(cookie);

            CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
            String token = csrfToken.getToken();
            Optional<String> origin = Optional.ofNullable(request.getHeader("origin"));
            if (origin.isPresent() && origin.get().equals("file://")) {
                log.debug("Setting CSRF Token header for JHipster-Ionic app");
                response.addHeader("X-CSRF-TOKEN-IONIC", token);
            }
        }

        accessDeniedHandlerImpl.handle(request, response, accessDeniedException);
    }

    /**
     * The error page to use. Must begin with a "/" and is interpreted relative to the current context root.
     *
     * @param errorPage the dispatcher path to display
     *
     * @throws IllegalArgumentException if the argument doesn't comply with the above limitations
     * @see AccessDeniedHandlerImpl#setErrorPage(String)
     */
    public void setErrorPage(String errorPage) {
        accessDeniedHandlerImpl.setErrorPage(errorPage);
    }
}
