https://rxjs.dev/api/operators/

s=fromEvent(document, 'click')



interval(1000)

from([1,2,3])
.pipe(map(x=>x+1))
.subscribe(console.log)




s
.pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`));

s
.pipe(
  map(ev => interval(Math.random() * 2000).pipe(take(3))),
  take(2)
)
.pipe(
  combineAll()
)
.subscribe(x => console.log(x))



s
.pipe(map(e=>"eee"))
.subscribe(console.log)

s
.pipe(take(5))
.subscribe(console.log)


of(1,2,3)
.pipe(map(x=>x+10),toArray())
.subscribe(say('zzz'))

from([1,2,3])
.pipe(
     filter(x=>x>1),
     map(x=>x+10),
     scan((a,b)=>a+b,0),
     toArray()
 )
.subscribe(say('zzz'))


f=() => Math.random() * 2000

d=d3.range(100)
from(d)
.pipe(
    //mapTo(f()),
    map(f),
    //scan((acc, one) => acc + one, 0),
    scan((acc, one) =>[...acc,one] , []),
    toArray(),
)
.subscribe(x => console.log(x))


s
.pipe(first(ev => ev.target.tagName === 'DIV'))
.subscribe(console.log)

from(d3.range(100))
.pipe(last((v,i)=>i<10))
.subscribe(say('zzz'))


a=of(
  {id: 1, name: 'JavaScript'},
  {id: 2, name: 'Parcel'},
  {id: 2, name: 'webpack'},
  {id: 1, name: 'TypeScript'},
  {id: 3, name: 'TSLint'}
)

a.pipe(
    groupBy((x,i)=>x.name),
    mergeMap(
        x=>x.pipe(
                reduce((a,b)=>[...a,b],[])
            )
    )
)
.subscribe(say('dd'))


 of(10)
 .pipe(
     expand(x=>of(x+10)),
     take(20)
 )
 .subscribe(say('ddd'))

range(10)
.pipe(
  mapTo(1),
  mergeScan((acc, one) => of(acc + one), 0),
)
.subscribe(say('ddd'))

ss= x => interval(1000)
.pipe(
    map(i => x+i)
)

of('a', 'b', 'c')
.pipe(
  mergeMap(ss),
)
.subscribe(console.log)


s
.pipe(bufferCount(5))
.subscribe(console.log)

//交错
s.
.pipe(bufferCount(2, 1))
.subscribe(x => console.log(x))



interval(1000)
.pipe(buffer(s))
.subscribe(say('buffer'))


s
.pipe(
    mapTo(1),
    bufferTime(1000),

)
.subscribe(say('buffertime'))

s.pipe(
    mapTo(1),
    bufferTime(2000, 5000),
)
.subscribe(say('bbbb'));

t=()=>1000 + Math.random() * 4000

s.pipe(
    mapTo(1),
    bufferWhen(() =>
      interval(1e4)
    )
)
.subscribe(say('when'));


s.pipe(
  windowCount(3),
  map(win => win.pipe(skip(1))),
  mergeAll()
)
.subscribe(say('wincount'))

s.pipe(
  windowCount(2, 3),
  mergeAll(),
)
.subscribe(say('2,3'))


 s.pipe(
     operators.window(interval(1000)),
     map(win => win.pipe(take(2))),
     mergeAll(),
 )
 .subscribe(say("window"))



s
.pipe(pairwise())
.pipe(
  map(pair => {
    const x0 = pair[0].clientX;
    const y0 = pair[0].clientY;
    const x1 = pair[1].clientX;
    const y1 = pair[1].clientY;
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
  }),
)
.subscribe(say('distance'))


s
.pipe(partition(ev => ev.target.tagName === 'DIV'))
.map((z,i)=>z.subscribe(say('partition'+i)))


f=val => val >5 ? throwError('Error!') :of(val)

f=async ()=>{
    r=await fetch('/abc')
    return r.ok ? of(123) : throwError('ddd')
}


interval(1000)
.pipe(
      mergeMap(f),
      retry(2)
)
.subscribe({
  next: say('next'),
  error: say('error'),
})



of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe(
    distinct(),
  )
.subscribe(x => console.log(x))

 of(
    { age: 4, name: 'Foo'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo'},
  ).pipe(
    distinct(p => p.name), //整体不重复
//    distinctUntilChanged((p,q) => p.name === q.name), //相邻不重复
//    distinctUntilKeyChanged('name'),
//    distinctUntilKeyChanged('name', (x,y) => x.substring(0, 3) === y.substring(0, 3)),
  )
  .subscribe(x => console.log(x));

  of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4).pipe(
    distinctUntilChanged(),
  )
  .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4






interval(1000)
.pipe(sample(s))
.subscribe(say('sample'))


s
.pipe(
    audit(ev => interval(1000))
)
.subscribe(say('audit'))



s.pipe(
    debounce(() => interval(1000))
)
.subscribe(say('debounce'))



s
.pipe(
    mapTo(of(123)),
    throttle(ev => interval(1000)),
    mergeAll(),
)
.subscribe(say('throttle'))




s
.pipe(map((ev) => interval(1000)))
.pipe(mergeAll())
.subscribe(say('mergeAll'))

s
.pipe(
  map((ev) => interval(1000).pipe(take(10))),
)
.pipe(mergeAll(2));
.subscribe(say('mergeAll(2)'))




s.pipe(
  map(ev => interval(1000).pipe(take(4))),
)
.pipe(concatAll())
.subscribe(say('concatAll'))



s
.pipe(tap(say('click')))
.pipe(map((ev) => interval(1000)))
.pipe(
  switchAll()
)
.subscribe(say('switchall'))



of(1, 2, 3)
.pipe(switchMap(x=> of(x, x ** 2, x ** 3)))
.subscribe(say('switchMap'))



s
.pipe(
    switchMap((ev) => interval(1000))
)
.subscribe(say('switchMap'))


s.pipe(
  map((ev) => interval(1000).pipe(take(5))),
)
.pipe(exhaust())
.subscribe(say('exhaust'))



s.pipe(
  concatMapTo(interval(1000).pipe(take(4))),
)
.subscribe(say('concatmap'))



s.pipe(
  map(ev => interval(Math.random() * 2000).pipe(take(3))),
  take(2)
)
.pipe(
  combineAll()
)
.subscribe(say('combineall'))



s
.pipe(sampleTime(1000))
.subscribe(say('st'))

s
.pipe(auditTime(1000))
.subscribe(say('at'))

s
.pipe(debounceTime(1000))
.subscribe(say('dt'))

s
.pipe(throttleTime(1000))
.subscribe(say('tt'))

s
.pipe(
  throttleTime(400, asyncScheduler,
      {
      leading: false,
      trailing: true
    }
)
)
.subscribe(say('tt1'))

s
.pipe(delay(1000))
.subscribe(say('delay'))


const date = new Date('March 15, 2050 12:00:00')

s
.pipe(delay(date))
.subscribe(say('future'))


s.pipe(
  delayWhen(event => interval(Math.random() * 5000)),
)
.subscribe(say("delay when"))



of('a', 'b', 'c')
.pipe(
  mergeMap(x => interval(1000).pipe(map(i => x+i))),
)
.subscribe(say('mm'))


s
.pipe(find(ev => ev.target.tagName === 'DIV'))
.subscribe(x => console.log(x))

s
.pipe(findIndex(ev => ev.target.tagName === 'DIV'))
.subscribe(x => console.log(x))




interval(1000)
.pipe(timeinterval())
.subscribe(
    value => console.log(value),
    err => console.log(err),
);

interval(1000)
.pipe(timeout(900))
.subscribe(
    value => console.log(value),
    err => console.log(err),
)


