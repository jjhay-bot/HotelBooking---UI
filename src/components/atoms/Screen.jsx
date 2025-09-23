import { Grid, Stack } from "@mui/material";
// import { env } from "@constants";
import DefaultHeader from "@components/atoms/DefaultHeader";
import { useEffect } from "react";
import { useState } from "react";

/**
 * @typedef {import('@mui/material').StackProps} StackProps
 * @typedef {import('react').ReactNode} ReactNode
 */ import { useLocation } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoute";
import { env } from "@constants";
/**
 * A responsive layout component that provides a consistent structure with a header, content, and footer.
 * It extends the MUI Stack component, so all Stack props can be used directly.
 *
 * @param {StackProps & {
 *   vh?: string,
 *   children: ReactNode,
 *   header?: ReactNode,
 *   footer?: ReactNode,
 *   title?: string,
 *   backAction?: boolean,
 *   noHeader?:boolean
 * }} props
 * @returns {JSX.Element}
 */

const Screen = ({
  children,
  header,
  footer,
  title,
  backAction,
  noHeader = false,
  ...props
}) => {
  const { pathname } = useLocation();

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const devMode = env?.STAGE?.match(/local|dev/) ? "1px" : "0px";
  const isLandingPage = ["eserv", "order", "central", ""].includes(
    pathname?.replace("/", ""),
  );

  useEffect(() => {
    function updateHeight() {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        setViewportHeight(window.innerHeight);
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeight);
    } else {
      window.addEventListener("resize", updateHeight);
    }

    // Initial set
    updateHeight();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
      } else {
        window.removeEventListener("resize", updateHeight);
      }
    };
  }, []);

  return (
    <ProtectedRoute>
      <Grid
        justifyContent="center"
        container
        className="no-select"
        sx={{
          bgcolor: isLandingPage ? "#EFF0F6" : "#fff",
        }}
      >
        <Grid size="grow" sx={{ maxWidth: "1200px" }}>
          <Stack
            {...props}
            style={{
              "--env-width": devMode,
              height: viewportHeight,
            }}
          >
            {!noHeader && (
              <Stack flex={0} minHeight={56} justifyContent="center">
                {/* HEADERS */}
                {header ?? (
                  <DefaultHeader
                    title={title}
                    {...backAction}
                    isLandingPage={isLandingPage}
                  />
                )}
              </Stack>
            )}

            <Stack
              flex={1}
              sx={{
                height: "100%",
                overflowY: "auto",
                maxWidth: "100%",
                width: "100%",
                bgcolor: isLandingPage ? "#EFF0F6" : "#fff",
              }}
            >
              {/* CONTENTS */}
              {children}
            </Stack>

            <Stack flex={0}>
              {/* FOOTERS */}
              {footer}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </ProtectedRoute>
  );
};

export default Screen;
