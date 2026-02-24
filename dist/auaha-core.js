(function(){

  const Auaha = {
    version: "0.2.0",
    modules: {},
    debug: false,

    register(name, moduleFn){
      if(this.modules[name]){
        console.warn("Auaha: Module already registered:", name);
        return;
      }
      this.modules[name] = moduleFn;
    },

    init(){
      document.querySelectorAll("[data-auaha]").forEach(el=>{
        const moduleName = el.getAttribute("data-auaha");

        const module = this.modules[moduleName];

        if(!module){
          if(this.debug){
            console.warn("Auaha: Module not found:", moduleName);
          }
          return;
        }

        try {
          module(el, this.utils);
        } catch(err){
          console.error("Auaha: Module error in", moduleName, err);
        }
      });

      if(this.debug){
        console.log("Auaha Core v" + this.version + " initialized");
      }
    },

    utils: {
      normalize(str){
        return (str || "").toString().trim().toLowerCase();
      },

      getConfig(el, key, fallback=null){
        return el.getAttribute("data-auaha-" + key) ?? fallback;
      }
    }
  };

  // -----------------------------
  // FILTERS MODULE v1.1
  // -----------------------------

  Auaha.register("filters", function(el, utils){

    const targetSelector = utils.getConfig(el, "target");
    const hideTitle = utils.getConfig(el, "hide-title", "false");
    const hideCategory = utils.getConfig(el, "hide-category", "false");
    const buttonStyle = utils.getConfig(el, "button-style", "primary");

    if(!targetSelector) return;

    const section = document.querySelector(targetSelector);
    if(!section) return;

    const grid = section.querySelector(".blog-basic-grid.collection-content-wrapper");
    if(!grid) return;

    const cards = Array.from(grid.querySelectorAll("article.blog-basic-grid--container"));
    if(!cards.length) return;

    const original = cards.slice();

    // Visibility options
    if(hideTitle === "true"){
      section.querySelectorAll(".blog-title")
        .forEach(el=>el.style.display="none");
    }

    if(hideCategory === "true"){
      section.querySelectorAll(".blog-meta-section")
        .forEach(el=>el.style.display="none");
    }

    // Collect categories
    const categoryMap = new Map();

    cards.forEach(card=>{
      card.querySelectorAll(".blog-categories-list a.blog-categories")
        .forEach(link=>{
          const label = link.textContent.trim();
          const key = utils.normalize(label);
          if(!categoryMap.has(key)){
            categoryMap.set(key, label);
          }
        });
    });

    const sorted = Array.from(categoryMap.values()).sort();
    const labels = ["All", ...sorted];

    // Build buttons
    el.innerHTML = "";

    labels.forEach((label, index)=>{
      const btn = document.createElement("a");
      btn.href = "#";
      btn.classList.add("auaha-btn");

      if(buttonStyle === "primary")
        btn.classList.add("sqs-button-element--primary");
      else if(buttonStyle === "secondary")
        btn.classList.add("sqs-button-element--secondary");
      else if(buttonStyle === "tertiary")
        btn.classList.add("sqs-button-element--tertiary");

      if(index === 0) btn.classList.add("is-active");

      btn.dataset.filter = utils.normalize(label);
      btn.textContent = label;

      el.appendChild(btn);
    });

    function apply(filterKey){
      const want = utils.normalize(filterKey);

      if(want === "all"){
        original.forEach(card=>{
          card.style.display="";
          grid.appendChild(card);
        });
        return;
      }

      const matches = [];
      const nonMatches = [];

      original.forEach(card=>{
        const cats = Array.from(
          card.querySelectorAll(".blog-categories-list a.blog-categories")
        ).map(link=>utils.normalize(link.textContent));

        if(cats.includes(want)) matches.push(card);
        else nonMatches.push(card);
      });

      matches.forEach(card=>{
        card.style.display="";
        grid.appendChild(card);
      });

      nonMatches.forEach(card=>{
        card.style.display="none";
        grid.appendChild(card);
      });
    }

    el.addEventListener("click", function(e){
      const btn = e.target.closest(".auaha-btn");
      if(!btn) return;

      e.preventDefault();

      el.querySelectorAll(".auaha-btn")
        .forEach(b=>b.classList.remove("is-active"));

      btn.classList.add("is-active");

      apply(btn.dataset.filter);
    });

    apply("all");

  });

  document.addEventListener("DOMContentLoaded", function(){
    Auaha.init();
  });

  window.Auaha = Auaha;

})();
