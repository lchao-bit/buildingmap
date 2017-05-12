<?xml version="1.0" encoding="GB2312"?>
<StyledLayerDescriptor version="1.0.0" 
  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<NamedLayer> 
		<Name> area landmarks </Name>
    <UserStyle>
         <FeatureTypeStyle>
         <Rule>  <!-- Whole Map Line-->
					<MinScaleDenominator>52000</MinScaleDenominator>
           	<LineSymbolizer>
             <Stroke>
              <CssParameter name="stroke">#CCCCFF</CssParameter>
             	<CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
            </LineSymbolizer>
         </Rule>
         <Rule><!-- highway-motorway-->
          <Name>highway-motorway</Name>
	          <ogc:Filter>
			       <ogc:PropertyIsEqualTo>
			        <ogc:PropertyName>highway</ogc:PropertyName>
			         <ogc:Literal>motorway</ogc:Literal>
						 </ogc:PropertyIsEqualTo>
	          </ogc:Filter> 
          <LineSymbolizer>
           <Stroke>
          	<CssParameter name="stroke">#FF0000</CssParameter>
           	<CssParameter name="stroke-width">5</CssParameter>
           </Stroke>
          </LineSymbolizer>
          
          <TextSymbolizer>
          <Label>
            <ogc:PropertyName>name</ogc:PropertyName>
          </Label>

          <Font>
            <CssParameter name="font-family">Microsoft YaHei</CssParameter>
            <CssParameter name="font-style">Normal</CssParameter>
            <CssParameter name="font-size">14</CssParameter>
            <CssParameter name="font-weight">bold</CssParameter>
          </Font>
          
          <LabelPlacement>
            <LinePlacement>
            </LinePlacement>
          </LabelPlacement>
          <Halo>
            <Radius>
              <ogc:Literal>2</ogc:Literal>
            </Radius>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>        
            </Fill>
          </Halo>
          
          <Fill>
            <CssParameter name="fill">#000000</CssParameter>
          </Fill>
          
          <VendorOption name="group">true</VendorOption>
          
        </TextSymbolizer>
   			</Rule>
   			
   			<Rule><!-- highway-trunk-->
          <Name>highway-trunk</Name>
	          <ogc:Filter>
			       <ogc:PropertyIsEqualTo>
			        <ogc:PropertyName>highway</ogc:PropertyName>
			         <ogc:Literal>trunk</ogc:Literal>
						 </ogc:PropertyIsEqualTo>
	          </ogc:Filter> 
          <LineSymbolizer>
           <Stroke>
          	<CssParameter name="stroke">#FF0000</CssParameter>
           	<CssParameter name="stroke-width">5</CssParameter>
           </Stroke>
          </LineSymbolizer>
          
          <TextSymbolizer>
          <Label>
            <ogc:PropertyName>name</ogc:PropertyName>
          </Label>

          <Font>
            <CssParameter name="font-family">Microsoft YaHei</CssParameter>
            <CssParameter name="font-style">Normal</CssParameter>
            <CssParameter name="font-size">14</CssParameter>
            <CssParameter name="font-weight">bold</CssParameter>
          </Font>
          
          <LabelPlacement>
            <LinePlacement>
            </LinePlacement>
          </LabelPlacement>
          <Halo>
            <Radius>
              <ogc:Literal>2</ogc:Literal>
            </Radius>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>        
            </Fill>
          </Halo>
          
          <Fill>
            <CssParameter name="fill">#000000</CssParameter>
          </Fill>
          
          <VendorOption name="group">true</VendorOption>
          
        </TextSymbolizer>
   			</Rule>
   			
   			<Rule><!-- highway-primary-->
          <Name>highway-primary</Name>
	          <ogc:Filter>
			       <ogc:PropertyIsEqualTo>
			        <ogc:PropertyName>highway</ogc:PropertyName>
			         <ogc:Literal>primary</ogc:Literal>
						 </ogc:PropertyIsEqualTo>
	          </ogc:Filter> 
          <LineSymbolizer>
           <Stroke>
          	<CssParameter name="stroke">#FF0000</CssParameter>
           	<CssParameter name="stroke-width">5</CssParameter>
           </Stroke>
          </LineSymbolizer>
          
          <TextSymbolizer>
          <Label>
            <ogc:PropertyName>name</ogc:PropertyName>
          </Label>

          <Font>
            <CssParameter name="font-family">Microsoft YaHei</CssParameter>
            <CssParameter name="font-style">Normal</CssParameter>
            <CssParameter name="font-size">14</CssParameter>
            <CssParameter name="font-weight">bold</CssParameter>
          </Font>
          
          <LabelPlacement>
            <LinePlacement>
            </LinePlacement>
          </LabelPlacement>
          <Halo>
            <Radius>
              <ogc:Literal>2</ogc:Literal>
            </Radius>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>        
            </Fill>
          </Halo>
          
          <Fill>
            <CssParameter name="fill">#000000</CssParameter>
          </Fill>
          
          <VendorOption name="group">true</VendorOption>
          
        </TextSymbolizer>
   			</Rule>
   			
   			<Rule>  <!-- little road -->
          <MaxScaleDenominator>52000</MaxScaleDenominator>
          <MinScaleDenominator>35000</MinScaleDenominator>
           <LineSymbolizer>
            <Stroke>
             <CssParameter name="stroke">#CCCCFF</CssParameter>
             <CssParameter name="stroke-width">1</CssParameter> 
            </Stroke>
           </LineSymbolizer> 
          </Rule> 
<!-- ************************************************************************************ -->
<!-- Zoom in 35000 map-->
           <Rule>  <!-- little road -->
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">4</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            
            <Rule>  <!-- little road -->
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFFFF</CssParameter>
                       <CssParameter name="stroke-width">2</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ -->            
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-motorway</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">10</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-motorway</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-motorway_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">10</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-motorway_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ --> 
  					<Rule>  <!-- thick line drawn first-->
               <Name>highway-trunk</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-trunk</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFF80</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-trunk_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-trunk_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFF80</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ -->  			
   	           <Rule>  <!-- thick line drawn first-->
               <Name>highway-primary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-primary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFF80</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-primary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-primary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFF80</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule>
<!-- ************************************************************************************ -->
           <Rule>  <!-- thick line drawn first-->
               <Name>highway-secondary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>13100</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-secondary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#C0C0C0</CssParameter>
                       <CssParameter name="stroke-width">4</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
           <Rule>  <!-- thick line drawn first-->
               <Name>highway-secondary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MaxScaleDenominator>13100</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">5</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-secondary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MaxScaleDenominator>35000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#C0C0C0</CssParameter>
                       <CssParameter name="stroke-width">4</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ -->
<!-- Zoom in 35000-52000 map-->       
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-motorway</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">13</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-motorway</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">12</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-motorway_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
               <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">13</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-motorway_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>motorway_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">12</CssParameter>
                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ --> 
  					<Rule>  <!-- thick line drawn first-->
               <Name>highway-trunk</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
               <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-trunk</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#FFFF80</CssParameter>
                       <CssParameter name="stroke-width">8</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-trunk_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-trunk_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>trunk_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">8</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
<!-- ************************************************************************************ -->  			
   	           <Rule>  <!-- thick line drawn first-->
               <Name>highway-primary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
              <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-primary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">8</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
            <Rule>  <!-- thick line drawn first-->
               <Name>highway-primary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
							 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>                  
               <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">9</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-primary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>primary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#CC9909</CssParameter>
                       <CssParameter name="stroke-width">8</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule>
<!-- ************************************************************************************ -->
           <Rule>  <!-- thick line drawn first-->
               <Name>highway-secondary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
               <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">7</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-secondary</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#C0C0C0</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule> 
           <Rule>  <!-- thick line drawn first-->
               <Name>highway-secondary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
               <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#333333</CssParameter>
                       <CssParameter name="stroke-width">7</CssParameter>

                     </Stroke>
                   </LineSymbolizer>

            </Rule> 
            
            <Rule>  <!-- thin line drawn second -->
               <Name>highway-secondary_link</Name>
                   <ogc:Filter>
                     <ogc:PropertyIsEqualTo>
                       <ogc:PropertyName>highway</ogc:PropertyName>
                       <ogc:Literal>secondary_link</ogc:Literal>
                     </ogc:PropertyIsEqualTo>
                   </ogc:Filter> 
                 <MinScaleDenominator>35000</MinScaleDenominator>
              <MaxScaleDenominator>52000</MaxScaleDenominator>
                   <LineSymbolizer>
                     <Stroke>
                       <CssParameter name="stroke">#C0C0C0</CssParameter>
                       <CssParameter name="stroke-width">6</CssParameter>

                     </Stroke>
                   </LineSymbolizer>
            </Rule>      
<!-- ************************************************************************************ -->
<!-- ************************************************************************************ -->
<!-- ************************************************************************************ -->

<!-- Label -->
      <Rule>
        <MaxScaleDenominator>52000</MaxScaleDenominator>
        <TextSymbolizer>
          <Label>
            <ogc:PropertyName>name</ogc:PropertyName>
          </Label>

          <Font>
            <CssParameter name="font-family">Microsoft YaHei</CssParameter>
            <CssParameter name="font-style">Normal</CssParameter>
            <CssParameter name="font-size">14</CssParameter>
            <CssParameter name="font-weight">bold</CssParameter>
          </Font>
          
          <LabelPlacement>
            <LinePlacement>
            </LinePlacement>
          </LabelPlacement>
          <Halo>
            <Radius>
              <ogc:Literal>2</ogc:Literal>
            </Radius>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
              <CssParameter name="fill-opacity">0.85</CssParameter>        
            </Fill>
          </Halo>
          
          <Fill>
            <CssParameter name="fill">#000000</CssParameter>
          </Fill>
          
          <VendorOption name="group">true</VendorOption>
          
        </TextSymbolizer>
      </Rule>      
<!-- ************************************************************************************ -->	
        </FeatureTypeStyle>
    </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>