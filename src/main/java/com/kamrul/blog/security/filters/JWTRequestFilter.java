package com.kamrul.blog.security.filters;


import com.kamrul.blog.security.jwt.JWTUtil;
import com.kamrul.blog.security.models.AppUserDetails;
import com.kamrul.blog.security.services.AppUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    AppUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException
    {
        final String authrizationHeader=request.getHeader("Authorization");
        Long userId=null;
        String jwt;
        if (authrizationHeader!=null && authrizationHeader.startsWith("Bearer "))
        {
            jwt=authrizationHeader.substring(7);
            userId=jwtUtil.extractUserId(jwt);
        }


        if(userId!=null && SecurityContextHolder.getContext().getAuthentication()==null)
        {
            AppUserDetails userDetails=userDetailsService.loadUserByUserId(userId);
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                    =new UsernamePasswordAuthenticationToken(
                    userDetails,null,userDetails.getAuthorities()
            );

            usernamePasswordAuthenticationToken
                    .setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }

        filterChain.doFilter(request,response);
    }
}