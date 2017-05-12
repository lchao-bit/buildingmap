<?xml version="1.0" encoding="GB2312"?>
<StyledLayerDescriptor version="1.0.0" 
  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<NamedLayer> <Name> area landmarks </Name>
    <UserStyle>
         <FeatureTypeStyle>
<!-- ************************************************************************************ -->           
                <Rule>  <!-- average_speed>15-->
                  <Name>average_speed[15,~)</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsGreaterThanOrEqualTo>
                       <ogc:PropertyName>average_speed</ogc:PropertyName>
                       <ogc:Literal>15</ogc:Literal>
                     </ogc:PropertyIsGreaterThanOrEqualTo>
                   </ogc:Filter> 
                  <MaxScaleDenominator>52000</MaxScaleDenominator>
                       <LineSymbolizer>
                         <Stroke>
                           <CssParameter name="stroke">#66FF00</CssParameter>
                           <CssParameter name="stroke-width">10</CssParameter>
                           <CssParameter name="stroke-opacity">0.7</CssParameter>
                         </Stroke>
                       </LineSymbolizer>      
                </Rule> 
<!-- ************************************************************************************ -->           
                <Rule>  <!-- average_speed(10,15)-->
                  <Name>average_speed(10,15)</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsBetween>
                       <ogc:PropertyName>average_speed</ogc:PropertyName>
                       <LowerBoundary><ogc:Literal>10</ogc:Literal></LowerBoundary>
                       <UpperBoundary><ogc:Literal>15</ogc:Literal></UpperBoundary>
                     </ogc:PropertyIsBetween>
                   </ogc:Filter> 
                  <MaxScaleDenominator>52000</MaxScaleDenominator>
                       <LineSymbolizer>
                         <Stroke>
                           <CssParameter name="stroke">#FFCC00</CssParameter>
                           <CssParameter name="stroke-width">8</CssParameter>
                           <CssParameter name="stroke-opacity">0.6</CssParameter>
                         </Stroke>
                       </LineSymbolizer>      
                </Rule>                
<!-- ************************************************************************************ -->           
                <Rule>  <!-- average_speed<=10-->
                  <Name>average_speed(0,10]</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsLessThanOrEqualTo>
                       <ogc:PropertyName>average_speed</ogc:PropertyName>
                       <ogc:Literal>10</ogc:Literal>
                     </ogc:PropertyIsLessThanOrEqualTo>
                   </ogc:Filter> 
                  <MaxScaleDenominator>52000</MaxScaleDenominator>
                       <LineSymbolizer>
                         <Stroke>
                           <CssParameter name="stroke">#FF0000</CssParameter>
                           <CssParameter name="stroke-width">5</CssParameter>
                           <CssParameter name="stroke-opacity">0.2</CssParameter>
                         </Stroke>
                       </LineSymbolizer>      
                </Rule>                                       
<!-- ************************************************************************************ -->           
              <Rule>  <!-- average_speed(null)-->
                  <Name>average_speed(null)</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsNull>
                       <ogc:PropertyName>average_speed</ogc:PropertyName>
                     </ogc:PropertyIsNull>
                   </ogc:Filter> 
                  <MaxScaleDenominator>52000</MaxScaleDenominator>
                       <LineSymbolizer>
                         <Stroke>
                           <CssParameter name="stroke">#FAF0E6</CssParameter>
                           <CssParameter name="stroke-width">5</CssParameter>
                           <CssParameter name="stroke-opacity">0.2</CssParameter>
                         </Stroke>
                       </LineSymbolizer>      
                </Rule>
          
        </FeatureTypeStyle>
        
    </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>