$(document).ready(function(){
	
	var item,img,title,large_img;
	var BH, BW, BL, BT, hpadding, vpadding, imgtag;
		
	var lb_loading = false;
	var doc = $(document);
	
	$("#lightbox li").click(function(){
			
		if(lb_loading) return false
		lb_loading = true;
		
		item = $(this);
		img = item.find("img");
		title = img.attr("data-title");
		
		
		//Hapus class aktif dari li yang diklik sebelumnya
		$("#lightbox li.active").removeClass("active");
		//Tambah class active di li yang di klik
		item.addClass("active");
		
		//gambar besar
		large_img = new Image();
		//Ambil url gambar, jika di atribute data-large tidak ada, maka ambil di thumb
		large_img.src = img.attr("data-large") ? img.attr("data-large") : item.attr("src");
			console.log(large_img);
		//Menambahkan HTML - cuma jika belum di tambahkan sebelumnya
		if($(".lb_background").length < 1)
		{
			var lb_background = '<div class="lb_background"></div>';
			var lb_box = '<div class="lb_box"></div>';
			var lb_prev = '<span class="lb_prev"><</span>';
			var lb_title = '<span class="lb_title"></span>';
			var lb_next = '<span class="lb_next">></span>';
			var lb_control = '<div class="lb_control">'+lb_prev+lb_title+lb_next+'</div>';
			var total_html = lb_background+lb_box+lb_control;
			$(total_html).appendTo("body");
			
		}
		
		//
		if($(".lb_background:visible").length == 0){
			$(".lb_background, .lb_box, .lb_control").fadeIn("slow");
		}
		
		//jika load image belum selesai tampilkan loader dan tranparan
		if(!large_img.complete)
			$(".lb_box").addClass("loading").children().css("opacity","0.5");
		
		//disable prev dan next
		
		
		if(item.prev().length == 0)
			$(".lb_prev").addClass("inactive");
		else
			$(".lb_prev").removeClass("inactive");
		if(item.next().length == 0)
			$(".lb_next").addClass("inactive");
		else
			$(".lb_next").removeClass("inactive");
		
		//centering .lb_box
		BW = $(".lb_box").outerWidth();
		BH = $(".lb_box").outerHeight();
		
		//centering koordinat left dan top
		BL = ($(window).width() - BW ) / 2;
		BT = ($(window).height() - BH ) / 2;
		$(".lb_box").css({top:BT, left:BL});
		
		$(large_img).load(function(){
			
			//centering dengan dimensi baru
			if ( large_img.width >= $(window).width() || large_img.height >= $(window).height() ){
					
				BW = large_img.width * 60 /100;
				BH = large_img.height * 60 /100;
			
			} else{
				BW = large_img.width;
				BH = large_img.height;
			}
			

			
			//Menambahkan padding pada dimensi gambar
			hpadding = parseInt($(".lb_box").css("paddingLeft"))+parseInt($(".lb_box").css("paddingRight"));
			vpadding = parseInt($(".lb_box").css("paddingTop"))+parseInt($(".lb_box").css("paddingBottom"));
			BL = ($(window).width() - BW - vpadding) /2;
			BT = ($(window).height() - BH - hpadding ) /2;
			
			//animasi .lb_box 
			$(".lb_box").html("").animate({width:BW, height:BH, left:BL, top:BT},500,function(){
				//masukan image dengan tetao terhidden
				imgtag = '<img src="'+large_img.src+'" style="opacity:0;width:100%;height:100%" />';
				$(".lb_box").html(imgtag);
				$(".lb_box img").fadeTo("slow",1);
				//Menampilkan title
				$(".lb_title").html(title);
				
				lb_loading = false;
				$(".lb_box").removeClass("loading");
				
				
				
			})
		})
		
			
	})
	
	//klik untuk navigasi
	doc.on("click",".lb_prev",function(){navigate(-1)});
	doc.on("click",".lb_next",function(){navigate(1)});
	doc.on("click",".lb_background",function(){navigate(0)});
	
	doc.keyup(function(e){
		
		if($(".lb_background:visible").length == 1 )
		{
			//kiri
			if( e.keyCode == "37" )navigate(-1);
			//kanan
			else if(e.keyCode =="39")navigate(1);
			//escape
			else if(e.keyCode =="27")navigate(0);
		}
	});
	
	function navigate(direction){
		
			if( direction == -1 ){
				
			 	$("#lightbox li.active").prev().trigger("click");
				
			} else if( direction == 1 ){
				
			 	$("#lightbox li.active").next().trigger("click");
				
			} else if (direction == 0 ){
				
				$("#lightbox li.active").removeClass("active");
				$(".lb_box").removeClass("loading");
				
				//fadeout WGSBox
				$(".lb_background, .lb_box, .lb_control").fadeOut("slow",function(){
					//kosongkan box dan title
					$(".lb_box, .lb_title").html("");
					
				})
				lb_loading =false;
			}
			
	}
	
	
});