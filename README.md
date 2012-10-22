# Knight Quest!

This is a simple Knight's Quest example for [wire.js](https://github.com/briancavalier/wire), a Javascript IOC Container.
It is based on (actually, originated from) Brian Cavalier's [Hello World example for wire.js](https://github.com/briancavalier/hello-wire).
I wrote this as a starting point to learn wire.js, using an example domain similar to what I used to demonstrate dependency injection
with Spring in the first chapter of Spring in Action.

## Running the demo

To run the demo:

1. git clone https://github.com/habuma/knight-wired.js
1. cd knight-wired.js
1. open `index.html` in your browser

By default, the demo will use [curl](https://github.com/unscriptable/curl) as the AMD loader.  You can also run the demo using [RequireJS](https://github.com/jrburke/requirejs.git), by appending `#requirejs` to the url, i.e. in step 3:

3. open `index.html#requirejs` in your browser

# wired.js Compared with Spring DI

For Spring developers who are getting started with Javascript dependency injection, it may be helpful to compare how this project's
dependency injection compares with an equivalent Spring configuration. 

Let's start by looking at the domain types in the example. The 'knight' module (in knight.js) defines a Knight class that is created
given a quest for that Knight to embark on:

```javascript
define([], function() {
	
	function Knight(quest) {
	  this._quest = quest;
	}
	
	Knight.prototype = {
	  embarkOnQuest: function() {
	    this._quest.embark();
	  }
	};
	
	return Knight;

});
```

This is approximately equivalent to the following Java-based implementation of Knight:

```java
package com.habuma.knight;
public class Knight {
  
  private Quest quest;
  
  public Knight(Quest quest) {
    this.quest = quest;
  }
  
  public void embarkOnQuest() {
    quest.embark();
  }

}
```

As for the Quest, it is defined in the following Javascript module (dragon-quest.js):

```javascript
define([], function() {
	
	function SlayDragonQuest(messageNode, message) {
    this._messageNode = messageNode;
    this._message = message;
	}
	
	SlayDragonQuest.prototype = {
	  embark: function() {
	    this._messageNode.innerHTML = this._message;
	  }
	};
	
	return SlayDragonQuest;

});
```

Which, when implemented in Java might look something like this:

```java
package com.habuma.knight;
import java.io.PrintStream;

public class SlayDragonQuest implements Quest {

	private PrintStream out;
	private String message;

	public SlayDragonQuest(PrintStream out, String message) {
		this.out = out;
		this.message = message;
	}
	
	public void embark() {
		out.println(message);
	}
	
}
```

There are a couple of key differences evident between the Javascript SlayDragonQuest and the Java implementation. First, to enable
loose-coupling between the Knight and his quest, the SlayDragonQuest class implements a Quest interface in Java. For JavaScript,
an interface is not necessary and any object can be given to the Knight so long as it has an embarkOnQuest() method.

Also, whereas the Javascript code will be running in a browser and will alter an injected DOM node to display its message, the Java
code will not be run in a browser and will have no access to a DOM node. Therefore, in lieu of a DOM node, the Java implementation
will be injected with a PrintStream to write its message to.

Now let's see how to wire this up. In Spring, using XML-based configuration, the wiring might look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="knight"
          class="com.habuma.knight.Knight"
          init-method="embarkOnQuest">
        <constructor-arg ref="quest" />
    </bean>
    
    <bean id="quest"
          class="com.habuma.knight.SlayDragonQuest">
        <constructor-arg value="#{T(System).out}" />
        <constructor-arg value="I'm off to slay the dragon!" />
    </bean>

</beans>
```

Note that I am using the Spring Expression Language to inject System.out as the PrintStream into the SlayDragonQuest bean's first 
constructor argument.

Keeping this very simple Spring configuration in mind, let's now look at how to accomplish the same kind of dependency injection 
using wire.js. The knight-wired-spec.js contains the wiring specification:

```javascript
define({
	message: "I'm off to slay the dragon!",
	
	knight: {
		create: {
			module: 'knight',
			args: { $ref: 'quest' }
		},
		ready: {
			embarkOnQuest: {}
		}
	},
	
	quest: {
	  create: {
	    module: 'dragon-quest',
	    args: [{ $ref: 'dom!message'}, {$ref: 'message'}]
	  }
	},
	
	plugins: [
		{ module: 'wire/debug', trace: true },
		{ module: 'wire/dom' }
	]

});
```

Although this wiring specification is expressed as Javascript object literals instead of XML, it's not hard to see how it aligns with the Spring 
XML configuration. There are a few small differences, such as defining the message as an individual item to be wired into 
the quest (which isn't necessary, but does demonstrate a nice feature in wire.js). The gist of the wiring specification,
however, is the same.

One interesting piece of this wiring specification is in the creation of the quest. The quest is created by constructing
the "dragon-quest" module and injecting it (via constructor-injection) with two values: A DOM element and a message. The
message given is simply a reference to the previously defined message near the top of the specification. The DOM element is
specified using the DOM plugin where "dom!message" references the element whose ID is "message" in the DOM. By injecting the
element in this way, the quest itself remains decoupled from the actual element where the message will be rendered.

